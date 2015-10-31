using System;
using NLog;

namespace Jira.Extension.Common.Services
{
    public class SafeExecutor : ISafeExecutor
    {
        private readonly ILogger _logger = LogManager.GetCurrentClassLogger();

        public bool TryExecute(Action action)
        {
            try
            {
                action();
                return true;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                return false;
            }
        }
    }
}