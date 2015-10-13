using System;

namespace Jira.Extension.RepositoryApi.Services
{
    public class SafeExecutor : ISafeExecutor
    {
        public bool TryExecute(Action action)
        {
            try
            {
                action();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}