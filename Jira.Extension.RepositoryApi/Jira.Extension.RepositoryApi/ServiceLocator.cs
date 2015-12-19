using Jira.Extension.Common.Interfaces;
using Jira.Extension.Common.Services;
using Jira.Extension.RepoBase;
using Jira.Extension.RepoBase.Svn;
using Jira.Extension.RepositoryApi.Services;
using Microsoft.Practices.Unity;

namespace Jira.Extension.RepositoryApi
{
    public class ServiceLocator
    {
        private IUnityContainer Container { get; set; }

        private static ServiceLocator _instance;
        public static ServiceLocator Instance
        {
            get { return _instance ?? (_instance = new ServiceLocator()); }
        }

        private ServiceLocator()
        {
            Container = new UnityContainer();
            RegisterLibraryComponents(Container);
            RegisterServices(Container);
            RegisterRepostiories(Container);
        }

        /// <summary>
        /// Perform injection on object.
        /// </summary>
        /// <param name="target">Object for dependency injection.</param>
        public void BuildUp(object target)
        {
            Container.BuildUp(target.GetType(), target);
        }

        private static void RegisterLibraryComponents(IUnityContainer container)
        {
            RepoBase.ServiceLocator.Instance.Initialize(container);
        }

        private static void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<ILogger, NlogLogger>(new ContainerControlledLifetimeManager());
            container.RegisterType<ISafeExecutor, SafeExecutor>(new ContainerControlledLifetimeManager());
            container.RegisterType<IExecutionLogger, ExecutionLogger>(new ContainerControlledLifetimeManager());
            container.RegisterType<IKeyProvider, FileKeyProvider>(new ContainerControlledLifetimeManager(),
                new InjectionConstructor(AppSettings.Instance.RsaKeyFilePath));
            container.RegisterType<ICryptoService, RsaCryptoService>(new ContainerControlledLifetimeManager());
        }

        private static void RegisterRepostiories(IUnityContainer container)
        {
            container.RegisterType<IRepoService, SvnRepositoryService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IRepoService, MockRepository>("Mock", new ContainerControlledLifetimeManager());
        }
    }
}