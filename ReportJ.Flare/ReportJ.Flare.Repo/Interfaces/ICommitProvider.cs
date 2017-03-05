using ReportJ.Flare.Repo.Entities;
using System.Collections.Generic;
using System.Net;

namespace ReportJ.Flare.Repo.Interfaces
{
    public interface ICommitProvider
    {
        /// <summary>
        /// Gets maximum count of commits that could be resolved.
        /// </summary>
        int MaxCountOfCommits { get; }

        /// <summary>
        /// Gets or sets maximum counts of commits that could be discovered while resolving last commits with conditions (for specific author etc.)
        /// Large MaxRepositoryDiscoverDepth could cause performance issues.
        /// </summary>
        int MaxRepositoryDiscoverDepth { get; set; }

        /// <summary>
        /// Get count of last commits.
        /// </summary>
        /// <param name="repoUrl">URL address of repository.</param>
        /// <param name="count">Count of commits to be resolved.</param>
        /// <returns>Last commits.</returns>
        IEnumerable<Commit> GetLastCommits(string repoUrl, int count = 10);

        /// <summary>
        /// Get count of last commits provided by specific user.
        /// </summary>
        /// <param name="repoUrl">URL address of repository.</param>
        /// <param name="author">Author of commits</param>
        /// <param name="count">Count of commits to be resolved.</param>
        /// <returns>Last commits.</returns>
        IEnumerable<Commit> GetLastCommits(string repoUrl, string author, int count = 10);
    }
}
