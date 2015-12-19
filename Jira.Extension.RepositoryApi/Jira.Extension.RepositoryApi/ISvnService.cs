using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using Jira.Extension.RepositoryApi.Dto;

namespace Jira.Extension.RepositoryApi
{
    [ServiceContract]
    public interface ISvnService
    {
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "commits?repo={repoUrl}&username={userName}&password={password}&count={count}&author={author}")]
        List<CommitDto> GetCommits(string repoUrl, string userName, string password, int count, string author);

        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json, UriTemplate = "connection/test?repo={repoUrl}&username={userName}&password={password}")]
        bool TestConnection(string repoUrl, string userName, string password);
    }
}
