using System;

namespace ReportJ.Common.Exceptions
{
    public class ValidationException<T> : ValidationExceptionBase
    {
        public T Applicant { get; }

        public ValidationException(T applicant)
        {
            Applicant = applicant;
        }

        public ValidationException(T applicant, string message) : base(message)
        {
            Applicant = applicant;
        }

        public ValidationException(T applicant, string message, Exception innerException)
            : base(message, innerException)
        {
            Applicant = applicant;
        }
    }
}
