using System;

namespace Jira.Extension.Common.Interfaces
{
    public interface IExecutionLogger
    {
        /// <summary>
        /// Execute operation and log duration of action execution.
        /// </summary>
        /// <param name="action">Operation to execute.</param>
        /// <param name="logger"></param>
        /// <param name="message">Initial message for log.</param>
        void ExecuteWithDurationLogging(Action action, ILogger logger, string message);

        /// <summary>
        /// Execute operation and log duration of action execution.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="func">Operation to execute.</param>
        /// <param name="logger"></param>
        /// <param name="message">Initial message for log.</param>
        /// <returns></returns>
        T ExecuteWithDurationLogging<T>(Func<T> func, ILogger logger, string message);
    }
}
