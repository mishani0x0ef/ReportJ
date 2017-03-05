using FluentValidation.Configuration;
using Ninject;
using ReportJ.Common.Interfaces;
using ReportJ.Common.Services;
using ReportJ.Flare.Api.Constraints;
using ReportJ.Flare.Repo.Interfaces;
using ReportJ.Flare.Repo.Services;
using ReportJ.Flare.Repo.Validation;

namespace ReportJ.Flare.Api.App_Start
{
    public class NinjectConfig
    {
        public static StandardKernel CreateKernel()
        {
            var kernel = new StandardKernel();

            RegisterCommon(kernel);
            RegisterProviders(kernel);

            return kernel;
        }

        private static void RegisterCommon(IKernel kernel)
        {
            kernel.Bind<IEntityMapper>().To<EntityMapper>().InSingletonScope();

            kernel.Bind<IValidationConfiguration>().To<ValidationConfiguration>();
            kernel.Bind<IValidationProfile>().To<ValidationProfile>();
            kernel.Bind<IValidator>().To<FluentValidator>().InSingletonScope();
        }

        private static void RegisterProviders(StandardKernel kernel)
        {
            kernel.Bind<ICommitProvider>().To<SvnCommitProvider>().WhenTargetHas<SvnAttribute>().InSingletonScope();
            kernel.Bind<ICommitProvider>().To<GitCommitProvider>().WhenTargetHas<GitAttribute>().InSingletonScope();
        }
    }
}
