using NUnit.Framework;
using ReportJ.Flare.Repo.Validation;

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
            var validationConfigurator = ServiceLocator.Instance.Resolve<Configurator>();
            if (!validationConfigurator.ValidationConfigured)
            {
                validationConfigurator.Configure();
            }
        }

        protected virtual void PostSetUp()
        {
        }
    }
}
