namespace ReportJ.Common.Interfaces
{
    public interface IValidator
    {
        /// <summary>
        /// Validate instance of an object. Throw exception in case of validation error.
        /// Support fluent sytax.
        /// </summary>
        /// <exception cref="ReportJ.Common.Exceptions.ValidationException{T}"></exception>
        IValidator ValidateAndThrow<T>(T applicant);

        /// <summary>
        /// Validate instance of an object. And return true if instance valid.
        /// </summary>
        bool Validate<T>(T applicant);
    }
}
