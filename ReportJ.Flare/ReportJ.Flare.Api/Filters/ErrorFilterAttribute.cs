﻿using ReportJ.Flare.Api.Models;
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

            context.Response = context.Request.CreateResponse(HttpStatusCode.InternalServerError,
                new ResultModel<string>("Error occured on server side.", Status.Error));
        }
    }
}
