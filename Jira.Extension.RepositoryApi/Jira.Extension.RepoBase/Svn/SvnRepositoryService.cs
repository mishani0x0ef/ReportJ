using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using Jira.Extension.Common.Interfaces;
using Jira.Extension.RepoBase.Entities;
using Microsoft.Practices.Unity;
using SharpSvn;

namespace Jira.Extension.RepoBase.Svn
{
    public class SvnRepositoryService : IRepoService
    {
        public int MaxCountOfCommits { get; private set; }
        public int MaxRepositoryDiscoverDepth { get; set; }

        [Dependency("RepoBase")]
        public IExecutionLogger ExecutionLogger { get; set; }

        [Dependency]
        public ILogger Logger { get; set; }

        private const int RepoDiscoveryStepCoef = 20;

        public SvnRepositoryService()
        {
            MaxCountOfCommits = 30;
            MaxRepositoryDiscoverDepth = 1000;
        }

        public SvnRepositoryService(IExecutionLogger executionLogger) : this()
        {
            ExecutionLogger = executionLogger;
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
            using (var svn = new SvnClient())
            {
                svn.Authentication.Clear();
                svn.Authentication.DefaultCredentials = credential;

                var client = svn;

                var endRevision = ExecutionLogger
                    .ExecuteWithDurationLogging(() => GetLastRevision(client, repoUrl), Logger, "Open connection to svn");

                var commits =ExecutionLogger
                    .ExecuteWithDurationLogging(() => GetCommits(client, repoUrl, endRevision, count, filter),
                    Logger, "Resolve commits info");

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

                commits.AddRange(logEvents.Where(filter).Select(logEvent => logEvent.ToCommit()));

                discoveredDepth += endRevision - startRevision;
                endRevision = endRevision - 1 > repoDiscoveryStep ? endRevision - repoDiscoveryStep - 1 : 1;
            }

            return commits;
        }
    }
}
