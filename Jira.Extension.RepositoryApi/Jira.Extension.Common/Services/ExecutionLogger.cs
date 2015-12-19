using System;
using Jira.Extension.Common.Interfaces;

namespace Jira.Extension.Common.Services
{
    public class ExecutionLogger : IExecutionLogger
    {
        public void ExecuteWithDurationLogging(Action action, ILogger logger, string message)
        {
            var operationStartTime = DateTime.Now;

            action();

            var operationDuration = DateTime.Now - operationStartTime;
            logger.Debug(string.Format("{0}. - {1}", message, operationDuration));
        }

        public T ExecuteWithDurationLogging<T>(Func<T> func, ILogger logger, string message)
        {
            var operationStartTime = DateTime.Now;

            var result = func();

            var operationDuration = DateTime.Now - operationStartTime;
            logger.Debug(string.Format("{0}. - {1}", message, operationDuration));

            return result;
        }
    }
}
