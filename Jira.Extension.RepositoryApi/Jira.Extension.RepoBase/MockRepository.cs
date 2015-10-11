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

        private readonly string[] _authors = {"Mark Commit", "Debby Revert", "Ostin Merge"};
        private readonly string[] _commits =
        {
            "Added warning message when open popup outside the JIRA, blocked possibility to add commits info. Added more data to MockRepository for better simulation.",
            "Added confirmation message on adding commit. Used test method from Repository API for testing before implementation of repository settings.",
            "Provided apply of binding after async load of commits.",
            "Changed DateTime DTO to double which represent Unix timestamp.",
            "Used repository API in popup controller to load info about commits."
        };

        public IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, int count = 10)
        {
            count = count > MaxCountOfCommits ? MaxCountOfCommits : count;
            var random = new Random((int)DateTime.Now.Ticks);
            for (var i = 0; i < count; i++)
            {
                yield return
                    new Commit
                    {
                        CommitId = i.ToString(),
                        Author = _authors[random.Next(0, _authors.Length - 1)],
                        Date = DateTime.Now.AddMinutes(random.Next(0, 1000)*(-1)),
                        Message = _commits[random.Next(0, _commits.Length - 1)]
                    };
            }
        }

        public IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, string author, int count = 10)
        {
            count = count > MaxCountOfCommits ? MaxCountOfCommits : count;
            var random = new Random((int) DateTime.Now.Ticks);
            for (var i = 0; i < count; i++)
            {
                yield return
                    new Commit
                    {
                        CommitId = i.ToString(),
                        Author = string.IsNullOrEmpty(author) ? _authors[random.Next(0, _authors.Length - 1)] : author,
                        Date = DateTime.Now.AddMinutes(random.Next(0, 1000)*(-1)),
                        Message = _commits[random.Next(0, _commits.Length - 1)]
                    };
            }
        }
    }
}
