using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using Jira.Extension.RepoBase.Entities;
using SharpSvn;

namespace Jira.Extension.RepoBase.Svn
{
    public class SvnRepositoryService : IRepoService
    {
        public int MaxCountOfCommits { get; private set; }
        public int MaxRepositoryDiscoverDepth { get; set; }

        public SvnRepositoryService()
        {
            MaxCountOfCommits = 30;
            MaxRepositoryDiscoverDepth = 100;
        }

        public IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, int count = 10)
        {
            return GetLastCommits(repoUrl, credential, count, args => true);
        }

        public IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, string author,
            int count = 10)
        {
            return GetLastCommits(repoUrl, credential, count,
                args => String.Equals(args.Author, author, StringComparison.CurrentCultureIgnoreCase));
        }

        private IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, int count,
            Func<SvnLogEventArgs, bool> filter)
        {
            const int repoDiscoveryStep = 10;
            using (var svn = new SvnClient())
            {
                var commits = new List<Commit>();

                svn.Authentication.Clear();
                svn.Authentication.DefaultCredentials = credential;

                SvnInfoEventArgs info;
                svn.GetInfo(repoUrl, out info);

                long discoveredDepth = 0;
                var endRevision = info.Revision;

                while (commits.Count < count && discoveredDepth <= MaxRepositoryDiscoverDepth && endRevision > 1)
                {
                    var startRevision = endRevision > repoDiscoveryStep ? endRevision - repoDiscoveryStep : 1;

                    var logArguments = new SvnLogArgs {Start = startRevision, End = endRevision};

                    Collection<SvnLogEventArgs> logEvents;
                    svn.GetLog(new Uri(repoUrl), logArguments, out logEvents);

                    commits.AddRange(logEvents.Where(filter).Select(logEvent => logEvent.ToCommit()));

                    discoveredDepth += endRevision - startRevision;
                    endRevision = endRevision > repoDiscoveryStep ? endRevision - repoDiscoveryStep : 1;
                }

                return commits.OrderByDescending(commit => commit.Date).Take(count);
            }
        } 
    }
}
