using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using Jira.Extension.RepositoryApi.Dto;

namespace Jira.Extension.RepositoryApi
{
    [ServiceContract]
    public interface ISvnService
    {
        /// <summary>
        /// Base methods. Could be used for testing. Work with predefined repository. Return last 10 commits.
        /// </summary>
        /// <returns>Return last 10 commits.</returns>
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "commits/test")]
        List<CommitDto> GetCommitsTest();

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "commits?repo={repoUrl}&username={userName}&password={password}&count={count}&author={author}")]
        List<CommitDto> GetCommits(string repoUrl, string userName, string password, int count, string author);
    }
}
