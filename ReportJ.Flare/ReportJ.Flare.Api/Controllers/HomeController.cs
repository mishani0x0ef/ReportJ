using System.Web.Mvc;

namespace ReportJ.Flare.Api.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "ReportJ.Flare";

            return View();
        }
    }
}
