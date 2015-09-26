using System;
using System.ServiceModel.Activation;
using System.Web;
using System.Web.Routing;

namespace Jira.Extension.RepositoryApi
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            RouteTable.Routes.Add(new ServiceRoute("svn", new WebServiceHostFactory(), typeof(SvnService)));
        }
    }
}