using ReportJ.Flare.Repo.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using ReportJ.Flare.Repo.Entities;
using System.Net;
using SharpSvn;
using System.Collections.ObjectModel;

namespace ReportJ.Flare.Repo.Services
{
    public class SvnCommitProvider : ICommitProvider
    {
        public int MaxCountOfCommits { get; private set; }
        public int MaxRepositoryDiscoverDepth { get; set; }

        private IRequestProxy _proxy;
        private IEntityMapper _mapper;

        private const int RepoDiscoveryStepCoef = 20;

        public SvnCommitProvider(IRequestProxy connection, IEntityMapper mapper)
        {
            MaxCountOfCommits = 30;
            MaxRepositoryDiscoverDepth = 1000;

            _proxy = connection;
            _mapper = mapper;
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

        private IEnumerable<Commit> GetLastCommits(string repoUrl, ICredentials credential, int count,
            Func<SvnLogEventArgs, bool> filter)
        {
            return _proxy.ExecuteWithSvn(svn =>
            {
                var endRevision = GetLastRevision(svn, repoUrl);
                var commits = GetCommits(svn, repoUrl, endRevision, count, filter);
                return commits.OrderByDescending(commit => commit.Date).Take(count);
            }, credential);
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

                commits.AddRange(logEvents.Where(filter).Select(_mapper.Map<SvnLogEventArgs, Commit>));

                discoveredDepth += endRevision - startRevision;
                endRevision = endRevision - 1 > repoDiscoveryStep ? endRevision - repoDiscoveryStep - 1 : 1;
            }

            return commits;
        }
    }
}
