using System;

namespace ReportJ.Common.Exceptions
{
    public abstract class ReportjExceptionBase : Exception
    {
        protected ReportjExceptionBase()
        {
        }

        protected ReportjExceptionBase(string message) : base(message)
        {
        }

        protected ReportjExceptionBase(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
