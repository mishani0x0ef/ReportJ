using System.Collections.Generic;
using System.Net;
using Jira.Extension.RepoBase.Entities;

namespace Jira.Extension.RepoBase
{
    /// <summary>
    /// Service for getting information about commits in repository.
    /// </summary>
    public interface IRepoService
    {
        /// <summary>
        /// Gets maximum count of commits that could be resolved.
        /// </summary>
        int MaxCountOfCommits { get; }

        /// <summary>
        /// Gets or sets maximum counts of commits that could be inspected while resolving last commits with conditions (for specific author etc.)
        /// Large MaxRepositoryDiscoverDepth could cause performance issues.
        /// </summary>
        int MaxRepositoryDiscoverDepth { get; set; }

        /// <summary>
        /// Get count of last commits.
        /// </summary>
        /// <param name="repoUrl">URL address of repository.</param>
        /// <param name="credential">Credentials with authority to view repository.</param>
        /// <param name="count">Count of commits to be resolved.</param>
        /// <returns>Last commits.</returns>
        IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, int count = 10);

        /// <summary>
        /// Get count of last commits provided by specific user.
        /// </summary>
        /// <param name="repoUrl">URL address of repository.</param>
        /// <param name="credential">Credentials with authority to view repository.</param>
        /// <param name="author">Author of commits</param>
        /// <param name="count">Count of commits to be resolved.</param>
        /// <returns>Last commits.</returns>
        IEnumerable<Commit> GetLastCommits(string repoUrl, NetworkCredential credential, string author, int count = 10);
    }
}
