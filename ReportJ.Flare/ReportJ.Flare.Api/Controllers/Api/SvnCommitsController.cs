using ReportJ.Flare.Api.Constraints;
using ReportJ.Flare.Api.Models;
using ReportJ.Flare.Api.Models.Mapping;
using ReportJ.Flare.Repo.Interfaces;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace ReportJ.Flare.Api.Controllers.Api
{
    public class SvnCommitsController : ApiController
    {
        private readonly ICommitProvider _provider;

        public SvnCommitsController([Svn]ICommitProvider provider)
        {
            _provider = provider;
        }

        public IEnumerable<CommitModel> Get(string repoUrl, string userName, string password, int count = 10)
        {
            // todo: provide password security. MR
            var creds = new NetworkCredential(userName, password);
            return _provider.GetLastCommits(repoUrl, creds, count).ToModel();
        }
    }
}