using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;
using ReportJ.Flare.Api.App_Start;
using System.Web.Http;

namespace ReportJ.Flare.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            RouteConfig.RegisterRoutes(config.Routes);

            app.UseNinjectMiddleware(NinjectConfig.CreateKernel).UseNinjectWebApi(config);
        }
    }
}
