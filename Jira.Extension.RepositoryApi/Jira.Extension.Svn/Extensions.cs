using Jira.Extension.RepoBase.Entities;
using SharpSvn;

namespace Jira.Extension.Svn
{
    public static class Extensions
    {
        public static Commit ToCommit(this SvnLogEventArgs logEvent)
        {
            return new Commit
            {
                Author = logEvent.Author,
                Message = logEvent.LogMessage,
                Date = logEvent.Time
            };
        }
    }
}
