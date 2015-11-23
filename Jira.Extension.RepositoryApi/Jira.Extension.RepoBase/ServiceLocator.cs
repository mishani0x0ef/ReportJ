using Jira.Extension.Common.Interfaces;
using Jira.Extension.Common.Services;
using Microsoft.Practices.Unity;

namespace Jira.Extension.RepoBase
{
    public class ServiceLocator
    {
        private static ServiceLocator _instance;
        public static ServiceLocator Instance
        {
            get { return _instance ?? (_instance = new ServiceLocator()); }
        }

        private ServiceLocator()
        {
        }

        public void Initialize(IUnityContainer container)
        {
            RegisterServices(container);
        }

        private void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IExecutionLogger, ExecutionLogger>("RepoBase", new ContainerControlledLifetimeManager());
        }
    }
}
