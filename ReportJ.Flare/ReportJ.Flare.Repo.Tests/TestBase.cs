using NUnit.Framework;

namespace ReportJ.Flare.Repo.Tests
{
    [TestFixture]
    public abstract class TestBase<TUnit>
    {
        protected TUnit TestUnit { get; set; }

        [SetUp]
        public void SetUp()
        {
            PreSetUp();

            TestUnit = ServiceLocator.Instance.Resolve<TUnit>();

            PostSetUp();
        }

        protected virtual void PreSetUp()
        {
        }

        protected virtual void PostSetUp()
        {
        }
    }
}
