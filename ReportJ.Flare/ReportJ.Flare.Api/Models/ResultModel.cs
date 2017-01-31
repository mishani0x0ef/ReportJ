namespace ReportJ.Flare.Api.Models
{
    public class ResultModel<T>
    {
        public Status Status { get; set; }
        public T Message { get; set; }

        public ResultModel()
        {
        }

        public ResultModel(T message, Status status = Status.Success)
        {
            Message = message;
            Status = status;
        }
    }
}
