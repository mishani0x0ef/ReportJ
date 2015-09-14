using Jira.Extension.RepoBase.Entities;
using SharpSvn;

namespace Jira.Extension.RepoBase.Svn
{
    internal static class Extensions
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
