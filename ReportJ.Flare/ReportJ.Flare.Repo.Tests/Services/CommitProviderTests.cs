using NUnit.Framework;
using ReportJ.Flare.Repo.Interfaces;
using System.Net;
using ReportJ.Common.Exceptions;

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
        public void GetLastCommits_EmptyRepoUrl_ValidationExceptionThrown()
        {
            _repoUrl = string.Empty;

            Assert.That(() => TestUnit.GetLastCommits(_repoUrl, _credentials),
                Throws.Exception.TypeOf<ValidationException<string>>());
        }

        [Test]
        public void GetLastCommits_TooLongRepoUrl_ValidationExceptionThrown()
        {
            _repoUrl = new string('a', 256);

            Assert.That(() => TestUnit.GetLastCommits(_repoUrl, _credentials),
                Throws.Exception.TypeOf<ValidationException<string>>());
        }

        [Test]
        public void GetLastCommits_MissedCredentials_ValidationExceptionThrown()
        {
            _credentials = null;

            Assert.That(() => TestUnit.GetLastCommits(_repoUrl, _credentials),
                Throws.Exception.TypeOf<ValidationException<NetworkCredential>>());
        }

        [Test]
        public void GetLastCommits_EmptyUserName_ValidationExceptionThrown()
        {
            _credentials.UserName = string.Empty;

            Assert.That(() => TestUnit.GetLastCommits(_repoUrl, _credentials),
                Throws.Exception.TypeOf<ValidationException<NetworkCredential>>());
        }

        [Test]
        public void GetLastCommits_TooLongUserName_ValidationExceptionThrown()
        {
            _credentials.UserName = new string('a', 256);

            Assert.That(() => TestUnit.GetLastCommits(_repoUrl, _credentials),
                Throws.Exception.TypeOf<ValidationException<NetworkCredential>>());
        }

        [Test]
        public void GetLastCommits_EmptyPassword_ValidationExceptionThrown()
        {
            _credentials.Password = string.Empty;

            Assert.That(() => TestUnit.GetLastCommits(_repoUrl, _credentials),
                Throws.Exception.TypeOf<ValidationException<NetworkCredential>>());
        }

        [Test]
        public void GetLastCommits_TooLongPassword_ValidationExceptionThrown()
        {
            _credentials.Password = new string('a', 256);

            Assert.That(() => TestUnit.GetLastCommits(_repoUrl, _credentials),
                Throws.Exception.TypeOf<ValidationException<NetworkCredential>>());
        }
    }
}
