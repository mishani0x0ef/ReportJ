[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ReportJ.Flare.Api.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(ReportJ.Flare.Api.App_Start.NinjectWebCommon), "Stop")]

namespace ReportJ.Flare.Api.App_Start
{
    using System;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using Repo.Interfaces;
    using Repo.Services;
    using FluentValidation.Configuration;
    using Common.Interfaces;
    using Repo.Validation;
    using ReportJ.Common.Interfaces;
    using ReportJ.Common.Services;
    using Constraints;

    public static class NinjectWebCommon
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }

        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        private static void RegisterServices(IKernel kernel)
        {
            RegisterCommon(kernel);
            RegisterProviders(kernel);
        }

        private static void RegisterCommon(IKernel kernel)
        {
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

            kernel.Bind<IEntityMapper>().To<EntityMapper>().InSingletonScope();

            kernel.Bind<IValidationConfiguration>().To<ValidationConfiguration>();
            kernel.Bind<IValidationProfile>().To<ValidationProfile>();
            kernel.Bind<IValidator>().To<FluentValidator>().InSingletonScope();
        }

        private static void RegisterProviders(IKernel kernel)
        {
            kernel.Bind<ICommitProvider>().To<SvnCommitProvider>()
                .WhenTargetHas<SvnAttribute>()
                .InSingletonScope();
        }
    }
}
