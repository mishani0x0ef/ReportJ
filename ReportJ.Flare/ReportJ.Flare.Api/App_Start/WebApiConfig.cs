using ReportJ.Flare.Api.Filters;
using System.Web.Http;
using System.Web.Http.Filters;

namespace ReportJ.Flare.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            RegisterFilters(config.Filters);
            RegisterRotes(config);
        }

        private static void RegisterFilters(HttpFilterCollection filters)
        {
            filters.Add(new ValidationExceptionFilterAttribute());
        }

        private static void RegisterRotes(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
