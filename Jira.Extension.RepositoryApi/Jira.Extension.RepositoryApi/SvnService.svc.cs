using System.Collections.Generic;
using System.Linq;
using Jira.Extension.RepoBase;
using Jira.Extension.RepositoryApi.Dto;
using Jira.Extension.RepositoryApi.Services;
using Microsoft.Practices.Unity;

namespace Jira.Extension.RepositoryApi
{
    public class SvnService : ISvnService
    {
        [Dependency]
        public IRepoService RepoService { get; set; }

        public SvnService()
        {
            ServiceLocator.Instance.BuildUp(this);
        }

        public List<CommitDto> GetCommits()
        {
            var commits = RepoService.GetLastCommits(AppSettings.Instance.DefaultRepositoryUrl,
                AppSettings.Instance.DefaultRepositoryCredential);
            return commits.Select(commit => commit.ToDto()).ToList();
        }
    }
}
