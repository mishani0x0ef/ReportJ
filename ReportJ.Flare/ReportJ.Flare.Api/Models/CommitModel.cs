using System;

namespace ReportJ.Flare.Api.Models
{
    public class CommitModel
    {
        public string CommitId { get; set; }
        public string Author { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}
