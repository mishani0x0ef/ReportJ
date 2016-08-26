using ReportJ.Common.Exceptions;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace ReportJ.Flare.Api.Filters
{
    public class ValidationExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {            
            if(context.Exception is ValidationExceptionBase)
            {
                var message = string.Format("Input data failed to pass validation rules:\n {0}", context.Exception.Message);
                context.Response = context.Request.CreateResponse(HttpStatusCode.BadRequest, message);
            }
        }
    }
}