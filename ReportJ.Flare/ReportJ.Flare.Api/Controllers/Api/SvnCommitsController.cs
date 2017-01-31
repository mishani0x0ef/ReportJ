using ReportJ.Flare.Api.Constraints;
using ReportJ.Flare.Api.Models;
using ReportJ.Flare.Api.Models.Mapping;
using ReportJ.Flare.Repo.Interfaces;
using System.Collections.Generic;
using System.Net;

namespace ReportJ.Flare.Api.Controllers.Api
{
    public class SvnCommitsController : BaseApiController
    {
        private readonly ICommitProvider _provider;

        public SvnCommitsController([Svn]ICommitProvider provider)
        {
            _provider = provider;
        }

        public ResultModel<IEnumerable<CommitModel>> Get(string repoUrl, string userName, string password, int count = 10)
        {
            // todo: provide password security. MR
            var creds = new NetworkCredential(userName, password);
            var commits = _provider.GetLastCommits(repoUrl, creds, count).ToModel();

            return new ResultModel<IEnumerable<CommitModel>>(commits);
        }
    }
}
