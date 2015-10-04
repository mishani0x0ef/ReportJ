using System.Runtime.Serialization;

namespace Jira.Extension.RepositoryApi.Dto
{
    [DataContract]
    public class CommitDto
    {
        [DataMember]
        public string CommitId { get; set; }

        [DataMember]
        public string Author { get; set; }

        [DataMember]
        public string Message { get; set; }

        [DataMember]
        public double Date { get; set; }
    }
}