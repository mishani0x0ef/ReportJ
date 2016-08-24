using FluentValidation.Configuration;
using Ninject;
using ReportJ.Common.Interfaces;
using ReportJ.Common.Services;
using ReportJ.Flare.Repo.Interfaces;
using ReportJ.Flare.Repo.Services;
using ReportJ.Flare.Repo.Validation;

namespace ReportJ.Flare.Repo.Tests
{
    public class ServiceLocator
    {
        public static ServiceLocator Instance
        {
            get
            {
                if (_instance != null) return _instance;
                lock (Locker)
                {
                    return _instance ?? (_instance = new ServiceLocator());
                }
            }
        }

        private static IKernel _kernel;
        private static ServiceLocator _instance;
        private static readonly object Locker = new object();

        private ServiceLocator()
        {
            Initialize();
        }

        /// <summary>
        ///  Resolve instance of type T.
        /// </summary>
        public T Resolve<T>()
        {
            return _kernel.Get<T>();
        }

        /// <summary>
        /// Replace binding of specific type by particular implementation.
        /// Useful for mocking services.
        /// </summary>
        public void Replace<T, TImplementation>(TImplementation implementaion) where TImplementation : T
        {
            _kernel.Rebind<T>().ToConstant(implementaion);
        }

        /// <summary>
        /// Replace binding of specific type to other type.
        /// Useful for mocking services.
        /// </summary>
        public void Replace<T, TImplementation>() where TImplementation : T
        {
            _kernel.Rebind<T>().To<TImplementation>();
        }

        private void Initialize()
        {
            _kernel = new StandardKernel();

            InitializeCommon(_kernel);
            InitializeServices(_kernel);
        }

        private void InitializeCommon(IKernel kernel)
        {
            kernel.Bind<IValidationConfiguration>().To<ValidationConfiguration>().InSingletonScope();
            kernel.Bind<ValidationProfile>().ToSelf().InSingletonScope();
            kernel.Bind<IValidator>().To<FluentValidator>();
        }

        private void InitializeServices(IKernel kernel)
        {
            kernel.Bind<IEntityMapper>().To<EntityMapper>();
            kernel.Bind<ICommitProvider>().To<SvnCommitProvider>();
        }
    }
}
