using Ninject;
using ReportJ.Flare.Repo.Interfaces;
using ReportJ.Flare.Repo.Services;

namespace ReportJ.Flare.Repo.Tests
{
    public class ServiceLocator
    {
        public static ServiceLocator Instance
        {
            get
            {
                if (_instance != null) return _instance;
                lock (_locker)
                {
                    return _instance ?? (_instance = new ServiceLocator());
                }
            }
        }

        private static IKernel _kernel;
        private static ServiceLocator _instance;
        private static object _locker = new object();

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
            InitializeServices(_kernel);
        }

        private void InitializeServices(IKernel kernel)
        {
            kernel.Bind<IEntityMapper>().To<EntityMapper>();
            kernel.Bind<IRequestProxy>().To<RequestProxy>();
            kernel.Bind<ICommitProvider>().To<SvnCommitProvider>();
        }
    }
}
