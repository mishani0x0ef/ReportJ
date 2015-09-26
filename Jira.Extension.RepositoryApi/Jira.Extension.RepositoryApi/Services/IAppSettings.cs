using System.Net;

namespace Jira.Extension.RepositoryApi.Services
{
    internal interface IAppSettings
    {
        string DefaultRepositoryUrl { get; }
        NetworkCredential DefaultRepositoryCredential { get; }
    }
}
