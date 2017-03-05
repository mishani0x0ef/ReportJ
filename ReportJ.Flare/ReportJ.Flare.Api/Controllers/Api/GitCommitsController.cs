using ReportJ.Flare.Api.Constraints;
using ReportJ.Flare.Api.Models;
using ReportJ.Flare.Api.Models.Mapping;
using ReportJ.Flare.Repo.Interfaces;
using System.Collections.Generic;
using System.Net;

namespace ReportJ.Flare.Api.Controllers.Api
{
    public class GitCommitsController : BaseApiController
    {
        private readonly ICommitProvider _provider;

        public GitCommitsController([Git]ICommitProvider provider)
        {
            _provider = provider;
        }

        public ResultModel<IEnumerable<CommitModel>> Get(string repoUrl, string userName, int count = 10)
        {
            var creds = new NetworkCredential(userName, string.Empty);
            var commits = _provider.GetLastCommits(repoUrl, creds, userName, count).ToModel();

            return new ResultModel<IEnumerable<CommitModel>>(commits);
        }
    }
}
