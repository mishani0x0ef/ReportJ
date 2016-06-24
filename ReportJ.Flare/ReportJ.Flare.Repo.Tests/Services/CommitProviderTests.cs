using NUnit.Framework;
using ReportJ.Flare.Repo.Interfaces;
using System.Net;

namespace ReportJ.Flare.Repo.Tests.Services
{
    public abstract class CommitProviderTests<TProvider> : TestBase<ICommitProvider> where TProvider : ICommitProvider
    {
        private string _repoUrl;
        private NetworkCredential _credentials;

        protected override void PreSetUp()
        {
            base.PreSetUp();
            ServiceLocator.Instance.Replace<ICommitProvider, TProvider>();
        }

        protected override void PostSetUp()
        {
            base.PostSetUp();
            _repoUrl = "repo://test";
            _credentials = new NetworkCredential("user", "password");
        }

        [Test]
        public void GetLastCommitsTest()
        {
            Assert.That(() => TestUnit.GetLastCommits(_repoUrl, _credentials), Throws.Nothing);
        }
    }
}
