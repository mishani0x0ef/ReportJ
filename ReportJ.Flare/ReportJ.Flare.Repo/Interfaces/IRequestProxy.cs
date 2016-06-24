using SharpSvn;
using System;
using System.Net;

namespace ReportJ.Flare.Repo.Interfaces
{
    /// <summary>
    /// Proxy for requests to repositories.
    /// </summary>
    public interface IRequestProxy
    {
        /// <summary>
        /// Execute function inside SVN connection.
        /// Perform requests to SVN repository.
        /// </summary>
        T ExecuteWithSvn<T>(Func<SvnClient, T> function, ICredentials credential);
    }
}
