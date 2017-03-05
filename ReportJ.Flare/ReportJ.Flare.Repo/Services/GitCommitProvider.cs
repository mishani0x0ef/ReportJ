using ReportJ.Flare.Repo.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using LibGit2Sharp;

namespace ReportJ.Flare.Repo.Services
{
    public class GitCommitProvider : ICommitProvider
    {
        public int MaxCountOfCommits
        {
            get { return 100; }
        }

        public int MaxRepositoryDiscoverDepth { get; set; }

        private readonly IEntityMapper _mapper;

        public GitCommitProvider(IEntityMapper mapper)
        {
            MaxRepositoryDiscoverDepth = 1000;

            _mapper = mapper;
        }

        public IEnumerable<Entities.Commit> GetLastCommits(string repoUrl, NetworkCredential credential, int count = 10)
        {
            count = Math.Min(count, MaxCountOfCommits);

            using(var repo = new Repository(repoUrl))
            {
                var commits = repo.Commits.Take(count);

                return _mapper.Map<LibGit2Sharp.Commit, Entities.Commit>(commits).ToList();
            }
        }

        public IEnumerable<Entities.Commit> GetLastCommits(string repoUrl, NetworkCredential credential, string author, int count = 10)
        {
            count = Math.Min(count, MaxCountOfCommits);

            using (var repo = new Repository())
            {
                var commits = repo.Commits.Where(c => c.Author.Name == author).Take(count);

                return _mapper.Map<LibGit2Sharp.Commit, Entities.Commit>(commits).ToList();
            }
        }
    }
}
