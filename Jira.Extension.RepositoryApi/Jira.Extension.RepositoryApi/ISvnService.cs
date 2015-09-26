using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using Jira.Extension.RepositoryApi.Dto;

namespace Jira.Extension.RepositoryApi
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ISvnService" in both code and config file together.
    [ServiceContract]
    public interface ISvnService
    {
        /// <summary>
        /// Base methods. Could be used for testing. Work with predefined repository. Return last 10 commits.
        /// </summary>
        /// <returns>Return last 10 commits.</returns>
        [OperationContract]
        [WebGet(UriTemplate = "commits")]
        List<CommitDto> GetCommits();
    }
}
