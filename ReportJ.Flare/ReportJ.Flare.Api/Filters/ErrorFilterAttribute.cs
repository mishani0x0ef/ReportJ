using ReportJ.Common.Exceptions;
using ReportJ.Flare.Api.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace ReportJ.Flare.Api.Filters
{
    public class ErrorFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            var ex = context.Exception;

            if (ex is ValidationExceptionBase)
            {
                var message = string.Format("Input data failed to pass validation rules:\n {0}", context.Exception.Message);
                context.Response = context.Request.CreateResponse(HttpStatusCode.BadRequest, 
                    new ResultModel<string>(message, Status.Error));
            }
            else
            {
                context.Response = context.Request.CreateResponse(HttpStatusCode.InternalServerError, 
                    new ResultModel<string>("Error occured on server side.", Status.Error));
            }
        }
    }
}
