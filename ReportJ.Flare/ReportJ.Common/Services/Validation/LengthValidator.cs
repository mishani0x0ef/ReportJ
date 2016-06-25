using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using ReportJ.Common.Interfaces;

namespace ReportJ.Common.Services.Validation
{
    public class LengthValidator : ICustomValidator<string>
    {
        public string Message { get; }

        private readonly StringLengthValidator _validator;

        public LengthValidator(int min, int max, string message = null)
        {
            _validator = new StringLengthValidator(min, max);
            Message = message ?? string.Format($"String length must be between {min} and {max} symbols");
        }

        public bool Validate(string applicant)
        {
            var results = _validator.Validate(applicant);
            return results.IsValid;
        }
    }
}
