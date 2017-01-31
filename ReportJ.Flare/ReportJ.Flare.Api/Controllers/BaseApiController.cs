using ReportJ.Flare.Api.Filters;
using System.Web.Http;

namespace ReportJ.Flare.Api.Controllers
{
    [ErrorFilter]
    public abstract class BaseApiController : ApiController
    {
    }
}
