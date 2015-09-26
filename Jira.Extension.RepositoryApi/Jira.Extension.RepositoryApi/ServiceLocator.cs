using Jira.Extension.RepoBase;
using Jira.Extension.RepoBase.Svn;
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

        private void RegisterRepostiories(IUnityContainer container)
        {
            container.RegisterType<IRepoService, SvnRepositoryService>(new ContainerControlledLifetimeManager());
            container.RegisterType<IRepoService, MockRepository>("Mock", new ContainerControlledLifetimeManager());
        }
    }
}