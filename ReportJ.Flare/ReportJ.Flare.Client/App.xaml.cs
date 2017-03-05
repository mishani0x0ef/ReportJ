using Microsoft.Owin.Hosting;
using ReportJ.Flare.Api;
using System;
using System.Windows;

namespace ReportJ.Flare.Client
{
    public partial class App : Application
    {
        private IDisposable _host;

        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            Exit += App_Exit;

            _host = WebApp.Start<Startup>(url: AppSettings.Instance.ApiBaseAddress);

            var view = new MainWindow();
            view.ShowDialog();
        }

        private void App_Exit(object sender, ExitEventArgs e)
        {
            _host.Dispose();
        }
    }
}
