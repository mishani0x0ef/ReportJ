using System.Collections.Generic;
using System.Linq;
using Jira.Extension.RepoBase.Entities;

namespace Jira.Extension.RepositoryApi.Dto
{
    public static class DtoConventer
    {
        public static CommitDto ToDto(this Commit commit)
        {
            return new CommitDto
            {
                CommitId = commit.CommitId,
                Author = commit.Author,
                Date = commit.Date,
                Message = commit.Message
            };
        }

        public static IEnumerable<CommitDto> ToDto(this IEnumerable<Commit> commits)
        {
            return commits.Select(commit => commit.ToDto());
        }
    }
}