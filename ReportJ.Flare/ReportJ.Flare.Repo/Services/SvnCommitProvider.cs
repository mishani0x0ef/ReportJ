using ReportJ.Flare.Repo.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using ReportJ.Flare.Repo.Entities;
using System.Net;
using SharpSvn;
using System.Collections.ObjectModel;
using ReportJ.Common.Utils;
using ReportJ.Flare.Repo.Validation;
using IValidator = ReportJ.Common.Interfaces.IValidator;

namespace ReportJ.Flare.Repo.Services
{
    public class SvnCommitProvider : ICommitProvider
    {
        public int MaxCountOfCommits { get; }
        public int MaxRepositoryDiscoverDepth { get; set; }

        private readonly IEntityMapper _mapper;
        private readonly IValidator _validator;

        private const int RepoDiscoveryStepCoef = 20;

        public SvnCommitProvider(IEntityMapper mapper, IValidator validator)
        {
            MaxCountOfCommits = 30;
            MaxRepositoryDiscoverDepth = 1000;

            _mapper = mapper;
            _validator = validator;
        }

        public IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, int count = 10)
        {
            return GetLastCommits(repoUrl, credential, count, args => true);
        }

        public IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, string author,
            int count = 10)
        {
            return GetLastCommits(repoUrl, credential, count,
                args => string.Equals(args.Author, author, StringComparison.CurrentCultureIgnoreCase));
        }

        private IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, int count,
            Func<SvnLogEventArgs, bool> filter)
        {
            _validator.ValidateFluentAndThrow<NetworkCredential, NetworkCredentialValidator>(credential);
            _validator.ValidateFluentAndThrow<string, UrlValidator>(repoUrl);

            using (var svn = new SvnClient())
            {
                svn.Authentication.Clear();
                svn.Authentication.DefaultCredentials = credential;

                var endRevision = GetLastRevision(svn, repoUrl);
                var commits = GetCommits(svn, repoUrl, endRevision, count, filter);
                return commits.OrderByDescending(commit => commit.Date).Take(count);
            }
        }

        private long GetLastRevision(SvnClient client, string repoUrl)
        {
            SvnInfoEventArgs info;
            client.GetInfo(repoUrl, out info);
            return info.Revision;
        }

        private IEnumerable<Commit> GetCommits(SvnClient client, string repoUrl, long endRevision, int count, Func<SvnLogEventArgs, bool> filter)
        {
            var repoDiscoveryStep = RepoDiscoveryStepCoef * count;

            var commits = new List<Commit>();
            long discoveredDepth = 0;

            while (commits.Count < count && discoveredDepth <= MaxRepositoryDiscoverDepth && endRevision > 1)
            {
                var startRevision = endRevision > repoDiscoveryStep ? endRevision - repoDiscoveryStep : 1;

                var logArguments = new SvnLogArgs { Start = startRevision, End = endRevision };

                Collection<SvnLogEventArgs> logEvents;
                client.GetLog(new Uri(repoUrl), logArguments, out logEvents);

                commits.AddRange(_mapper.Map<SvnLogEventArgs, Commit>(logEvents.Where(filter)));

                discoveredDepth += endRevision - startRevision;
                endRevision = endRevision - 1 > repoDiscoveryStep ? endRevision - repoDiscoveryStep - 1 : 1;
            }

            return commits;
        }
    }
}
