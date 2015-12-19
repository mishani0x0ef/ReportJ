using System;
using NLog;
using ILogger = Jira.Extension.Common.Interfaces.ILogger;

namespace Jira.Extension.Common.Services
{
    public class NlogLogger : ILogger
    {
        protected NLog.ILogger Logger = LogManager.GetCurrentClassLogger();

        public void Debug(string message)
        {
            Logger.Debug(message);
        }

        public void Trace(string message)
        {
            Logger.Trace(message);
        }

        public void Info(string message)
        {
            Logger.Info(message);
        }

        public void Warn(string message)
        {
            Logger.Warn(message);
        }

        public void Error(Exception ex, string message = null)
        {
            Logger.Error(ex, message);
        }

        public void Fatal(Exception ex, string message = null)
        {
            Logger.Fatal(ex, message);
        }
    }
}
