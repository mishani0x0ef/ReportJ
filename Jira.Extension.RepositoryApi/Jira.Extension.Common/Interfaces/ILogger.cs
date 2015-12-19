using System;

namespace Jira.Extension.Common.Interfaces
{
    public interface ILogger
    {
        void Debug(string message);
        void Trace(string message);
        void Info(string message);
        void Warn(string message);
        void Error(Exception ex, string message = null);
        void Fatal(Exception ex, string message = null);
    }
}
