using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Jira.Extension.Svn.Entities;
using SharpSvn;

namespace Jira.Extension.Svn
{
    public class Test
    {
        public IEnumerable<Commit> GetLastCommits(string repoUrlAddress, int count)
        {
            using (var svn = new SvnClient())
            {
                Collection<SvnLogEventArgs> commits;
                SvnInfoEventArgs info;
                var repoUrl = new Uri(repoUrlAddress);

                svn.GetInfo(repoUrl, out info);
                var startRevision = info.Revision > count ? info.Revision - count : 1;
                var logArguments = new SvnLogArgs
                {
                    Start = startRevision,
                    End = info.Revision
                };
                svn.GetLog(repoUrl, logArguments, out commits);

                foreach (var commit in commits)
                {
                    yield return
                        new Commit
                        {
                            Author = commit.Author,
                            Revision = commit.Revision,
                            Message = commit.LogMessage,
                            Date = commit.Time
                        };
                }
            }
        }
    }
}
