using System.Configuration;
using System.Net;

namespace Jira.Extension.RepositoryApi.Services
{
    internal class AppSettings : IAppSettings
    {
        private static readonly object Locker = new object();
        private static AppSettings _instance;
        public static AppSettings Instance
        {
            get
            {
                lock (Locker)
                {
                    return _instance ?? (_instance = new AppSettings());
                }
            }
        }

        public string DefaultRepositoryUrl { get; private set; }
        public NetworkCredential DefaultRepositoryCredential { get; private set; }

        private AppSettings()
        {
            DefaultRepositoryUrl = ConfigurationManager.AppSettings["DefaultRepositoryUrl"];
            DefaultRepositoryCredential = new NetworkCredential(
                ConfigurationManager.AppSettings["DefaultRepositoryUserName"],
                ConfigurationManager.AppSettings["DefaultRepositoryPassword"]);
        }
    }
}