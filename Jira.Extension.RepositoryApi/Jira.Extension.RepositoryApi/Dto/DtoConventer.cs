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
    }
}