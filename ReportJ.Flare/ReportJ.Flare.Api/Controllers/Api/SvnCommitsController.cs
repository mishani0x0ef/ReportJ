using ReportJ.Flare.Api.Constraints;
using ReportJ.Flare.Api.Models;
using ReportJ.Flare.Api.Models.Mapping;
using ReportJ.Flare.Repo.Interfaces;
using System.Collections.Generic;

namespace ReportJ.Flare.Api.Controllers.Api
{
    public class SvnCommitsController : BaseApiController
    {
        private readonly ICommitProvider _provider;

        public SvnCommitsController([Svn]ICommitProvider provider)
        {
            _provider = provider;
        }

        public ResultModel<IEnumerable<CommitModel>> Get(string repoUrl, string userName, int count = 10)
        {
            var commits = _provider.GetLastCommits(repoUrl, userName, count).ToModel();

            return new ResultModel<IEnumerable<CommitModel>>(commits);
        }
    }
}
