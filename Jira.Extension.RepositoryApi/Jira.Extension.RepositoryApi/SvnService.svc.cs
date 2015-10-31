using System.Collections.Generic;
using System.Linq;
using System.Net;
using Jira.Extension.Common.Services;
using Jira.Extension.RepoBase;
using Jira.Extension.RepositoryApi.Dto;
using Jira.Extension.RepositoryApi.Services;
using Microsoft.Practices.Unity;
using NLog;

namespace Jira.Extension.RepositoryApi
{
    public class SvnService : ISvnService
    {
        [Dependency]
        public IRepoService RepoService { get; set; }

        [Dependency]
        public ISafeExecutor SafeExecutor { get; set; }

        [Dependency]
        public IExecutionLogger ExecutionLogger { get; set; }

        private readonly ILogger _logger = LogManager.GetCurrentClassLogger();
        private const int DefautCommitsCount = 10;

        public SvnService()
        {
            ServiceLocator.Instance.BuildUp(this);
        }

        public List<CommitDto> GetCommitsTest()
        {
            var commits = RepoService.GetLastCommits(AppSettings.Instance.DefaultRepositoryUrl,
                AppSettings.Instance.DefaultRepositoryCredential);
            return commits.ToDto().ToList();
        }

        public List<CommitDto> GetCommits(string repoUrl, string userName, string password, int count, string author)
        {
            //todo: add input parameters validation. MR
            //todo: add decrypt of password with RSA when decrypt will be implemented on client side. MR
            count = count > 0 ? count : DefautCommitsCount;

            var commits = ExecutionLogger.ExecuteWithDurationLogging(
                () => string.IsNullOrEmpty(author)
                    ? RepoService.GetLastCommits(repoUrl, new NetworkCredential(userName, password), count)
                    : RepoService.GetLastCommits(repoUrl, new NetworkCredential(userName, password), author, count),
                _logger, "Total time for GetCommits");
            
            return commits.ToDto().ToList();
        }

        public bool TestConnection(string repoUrl, string userName, string password)
        {
            return SafeExecutor
                .TryExecute(() => RepoService.GetLastCommits(repoUrl, new NetworkCredential(userName, password), 1));
        }
    }
}
