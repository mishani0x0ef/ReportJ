using Microsoft.Owin.Hosting;
using NLog;
using ReportJ.Flare.Api;
using System;
using System.Threading;
using System.Windows;
using System.Windows.Threading;

namespace ReportJ.Flare.Client
{
    public partial class App : Application
    {
        protected static Mutex AppMutex { get; set; }

        private static ILogger Logger = LogManager.GetCurrentClassLogger();
        private IDisposable _host;

        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            if (AlreadyRunning())
            {
                MessageBox.Show(
                    "Application is already running. Please check notifications area.",
                    "Already Running",
                    MessageBoxButton.OK,
                    MessageBoxImage.Information,
                    MessageBoxResult.No,
                    MessageBoxOptions.DefaultDesktopOnly);

                Environment.Exit(0);
            }

            DispatcherUnhandledException += App_DispatcherUnhandledException;
            Exit += App_Exit;

            Logger.Info($"{AppSettings.Instance.FullVersion} Started");

            _host = WebApp.Start<Startup>(url: AppSettings.Instance.ApiBaseAddress);

            Logger.Info($"API hosted by address {AppSettings.Instance.ApiBaseAddress}");

            var view = new MainWindow();
            view.ShowDialog();
        }

        private bool AlreadyRunning()
        {
            bool newInstance;
            var mutexName = string.Format("Local\\{{{0}}}", AppSettings.Instance.AppGuid.ToString());

            Logger.Info($"Check is exist mutex with name '{mutexName}'");

            AppMutex = new Mutex(true, mutexName, out newInstance);

            var state = newInstance ? "has first instance" : "already running";
            Logger.Info($"Application is {state}");

            return !newInstance;
        }

        private void App_DispatcherUnhandledException(object sender, DispatcherUnhandledExceptionEventArgs e)
        {
            try
            {
                Logger.Fatal(e.Exception, "Unhandled exception occured. Application is about to be terminated.");
                _host?.Dispose();
            }
            catch (Exception)
            {
                // This block is last in lifecycle. It shouldn't throw errors to avoid circular call.
                // So, simply absorb all last exceptions.
            }
        }

        private void App_Exit(object sender, ExitEventArgs e)
        {
            _host?.Dispose();
            Logger.Info($"{AppSettings.Instance.FullVersion} Exit");
        }
    }
}
