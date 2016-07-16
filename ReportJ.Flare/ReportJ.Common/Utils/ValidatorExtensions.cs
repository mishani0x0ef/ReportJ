using System;
using FluentValidation;
using ReportJ.Common.Exceptions;
using IValidator = ReportJ.Common.Interfaces.IValidator;

namespace ReportJ.Common.Utils
{
    public static class ValidatorExtensions
    {
        /// <summary>
        /// Validate applicant using fluent validator for validated type.
        /// Useful in case if more than one validator for type exists.
        /// Throw ValidationException if applicant invalid.
        /// </summary>
        /// <typeparam name="T">Type of validated object.</typeparam>
        /// <typeparam name="TValidator">Type of validator that will be used.</typeparam>
        /// <param name="source">General validator instance.</param>
        /// <param name="applicant">Object for validation.</param>
        /// <exception cref="ValidationException{T}"></exception>
        public static void ValidateFluentAndThrow<T, TValidator>(this IValidator source, T applicant)
            where TValidator : IValidator<T>, new()
        {
            var validator = new TValidator();
            var result = validator.Validate(applicant);
            if (result.IsValid) return;

            var message = string.Join(Environment.NewLine, result.Errors);
            throw new ValidationException<T>(applicant, message);
        }
    }
}
