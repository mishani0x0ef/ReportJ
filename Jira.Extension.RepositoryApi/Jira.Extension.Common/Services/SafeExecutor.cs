using System;
using Jira.Extension.Common.Interfaces;
using Microsoft.Practices.Unity;

namespace Jira.Extension.Common.Services
{
    public class SafeExecutor : ISafeExecutor
    {
        [Dependency]
        public ILogger Logger { get; set; }

        public bool TryExecute(Action action)
        {
            try
            {
                action();
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
                return false;
            }
        }
    }
}