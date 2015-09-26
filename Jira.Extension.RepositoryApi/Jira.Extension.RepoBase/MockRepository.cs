using System;
using System.Collections.Generic;
using System.Net;
using Jira.Extension.RepoBase.Entities;

namespace Jira.Extension.RepoBase
{
    public class MockRepository : IRepoService
    {
        public MockRepository()
        {
            MaxCountOfCommits = 100;
        }

        public int MaxCountOfCommits { get; private set; }
        public int MaxRepositoryDiscoverDepth { get; set; }

        public IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, int count = 10)
        {
            count = count > MaxCountOfCommits ? MaxCountOfCommits : count;
            for (var i = 0; i < count; i++)
            {
                yield return
                    new Commit
                    {
                        CommitId = i.ToString(),
                        Author = string.Format("Test Author {0}", i),
                        Date = DateTime.Now.AddMinutes(i*(-1)),
                        Message = string.Format("Test message {0}", i)
                    };
            }
        }

        public IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, string author, int count = 10)
        {
            count = count > MaxCountOfCommits ? MaxCountOfCommits : count;
            for (var i = 0; i < count; i++)
            {
                yield return
                    new Commit
                    {
                        CommitId = i.ToString(),
                        Author = author,
                        Date = DateTime.Now.AddMinutes(i * (-1)),
                        Message = string.Format("Test message {0}", i)
                    };
            }
        }
    }
}
