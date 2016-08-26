using System;
using ReportJ.Common.Exceptions;
using IValidator = ReportJ.Common.Interfaces.IValidator;
using ReportJ.Flare.Common.Interfaces;

namespace ReportJ.Common.Services
{
    public class FluentValidator : IValidator
    {
        private readonly IValidationProfile _profile;

        public FluentValidator(IValidationProfile profile)
        {
            _profile = profile;
        }

        public IValidator ValidateAndThrow<T>(T applicant)
        {
            var validator = _profile.Configuration.GetValidator<T>();
            var result = validator.Validate(applicant);
            if (!result.IsValid)
            {
                throw new ValidationException<T>(applicant, string.Join(Environment.NewLine, result.Errors));
            }
            return this;
        }

        public bool Validate<T>(T applicant)
        {
            var validator = _profile.Configuration.GetValidator<T>();
            var result = validator.Validate(applicant);
            return result.IsValid;
        }
    }
}
