using ReportJ.Flare.Api.Util;
using System.Web.Http.Filters;

namespace ReportJ.Flare.Api.Filters
{
    public class VersionFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext context)
        {
            base.OnActionExecuted(context);

            context.Response = context.Response.AddVersion();
        }
    }
}
