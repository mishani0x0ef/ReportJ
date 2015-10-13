using System;

namespace Jira.Extension.RepositoryApi.Services
{
    public interface ISafeExecutor
    {
        /// <summary>
        /// Execute action and absorb any errors.
        /// </summary>
        /// <param name="action"></param>
        /// <returns>True if action was successfully executed otherwise return false.</returns>
        bool TryExecute(Action action);
    }
}
