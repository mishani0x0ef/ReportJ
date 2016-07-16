using System;
using FluentValidation.Configuration;
using ReportJ.Common.Exceptions;
using IValidator = ReportJ.Common.Interfaces.IValidator;

namespace ReportJ.Common.Services
{
    public class FluentValidator : IValidator
    {
        private readonly IValidationConfiguration _configuration;

        public FluentValidator(IValidationConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IValidator ValidateAndThrow<T>(T applicant)
        {
            var validator = _configuration.GetValidator<T>();
            var result = validator.Validate(applicant);
            if (!result.IsValid)
            {
                throw new ValidationException<T>(applicant, string.Join(Environment.NewLine, result.Errors));
            }
            return this;
        }

        public bool Validate<T>(T applicant)
        {
            var validator = _configuration.GetValidator<T>();
            var result = validator.Validate(applicant);
            return result.IsValid;
        }
    }
}
