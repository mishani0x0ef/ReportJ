using System;

namespace ReportJ.Flare.Repo.Entities
{
    public class Commit
    {
        public string CommitId { get; set; }
        public string Author { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}
