using System.Collections.Generic;
using System.Linq;
using System.Net;
using Jira.Extension.Common.Interfaces;
using Jira.Extension.RepoBase;
using Jira.Extension.RepositoryApi.Dto;
using Microsoft.Practices.Unity;
using NLog;

namespace Jira.Extension.RepositoryApi
{
    public class SvnService : ISvnService
    {
        [Dependency]
        public IRepoService RepoService { get; set; }

        [Dependency]
        public ICryptoService CryptoService { get; set; }

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

        public List<CommitDto> GetCommits(string repoUrl, string userName, string password, int count, string author)
        {
            count = count > 0 ? count : DefautCommitsCount;

            password = CryptoService.Decrypt(password);

            var commits = ExecutionLogger.ExecuteWithDurationLogging(
                () => string.IsNullOrEmpty(author)
                    ? RepoService.GetLastCommits(repoUrl, new NetworkCredential(userName, password), count)
                    : RepoService.GetLastCommits(repoUrl, new NetworkCredential(userName, password), author, count),
                _logger, "Total time for GetCommits");
            
            return commits.ToDto().ToList();
        }

        public bool TestConnection(string repoUrl, string userName, string password)
        {
            password = CryptoService.Decrypt(password);
            return SafeExecutor
                .TryExecute(() => RepoService.GetLastCommits(repoUrl, new NetworkCredential(userName, password), 1));
        }
    }
}
