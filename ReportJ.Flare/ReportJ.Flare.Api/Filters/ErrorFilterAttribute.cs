using NLog;
using ReportJ.Flare.Api.Models;
using ReportJ.Flare.Api.Util;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace ReportJ.Flare.Api.Filters
{
    public class ErrorFilterAttribute : ExceptionFilterAttribute
    {
        private static Logger Logger = LogManager.GetCurrentClassLogger();

        public override void OnException(HttpActionExecutedContext context)
        {
            var ex = context.Exception;

            Logger.Error(ex);

            var body = new ResultModel<string>("Error occured on server side.", Status.Error);

            context.Response = context.Request
                .CreateResponse(HttpStatusCode.InternalServerError, body)
                .AddVersion();
        }
    }
}
