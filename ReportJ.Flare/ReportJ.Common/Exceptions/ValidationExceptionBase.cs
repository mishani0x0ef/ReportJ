using System;

namespace ReportJ.Common.Exceptions
{
    public abstract class ValidationExceptionBase : ReportjExceptionBase
    {
        protected ValidationExceptionBase()
        {
        }

        protected ValidationExceptionBase(string message) : base(message)
        {
        }

        protected ValidationExceptionBase(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
