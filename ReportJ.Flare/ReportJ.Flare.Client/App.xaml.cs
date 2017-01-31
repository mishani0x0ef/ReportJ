using Microsoft.Owin.Hosting;
using ReportJ.Flare.Api;
using System.Windows;

namespace ReportJ.Flare.Client
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            using(WebApp.Start<Startup>(url: AppSettings.Instance.ApiBaseAddress))
            {
                var view = new MainWindow();
                view.ShowDialog();
            }
        }
    }
}
