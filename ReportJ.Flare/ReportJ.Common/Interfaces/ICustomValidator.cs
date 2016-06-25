namespace ReportJ.Common.Interfaces
{
    public interface ICustomValidator<in T>
    {
        string Message { get; }

        bool Validate(T applicant);
    }
}
