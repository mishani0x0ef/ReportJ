using System;

namespace Jira.Extension.Svn.Entities
{
    public class Commit
    {
        public string Author { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public long Revision { get; set; }
    }
}
