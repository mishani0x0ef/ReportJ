using System;
using ReportJ.Flare.Repo.Interfaces;
using SharpSvn;
using System.Net;

namespace ReportJ.Flare.Repo.Services
{
    public class RequestProxy : IRequestProxy
    {
        public SvnClient CreateSvnConnection()
        {
            return new SvnClient();
        }

        public T ExecuteWithSvn<T>(Func<SvnClient, T> function, ICredentials credential)
        {
            using(var svn = new SvnClient())
            {
                svn.Authentication.Clear();
                svn.Authentication.DefaultCredentials = credential;

                return function(svn);
            }
        }
    }
}
