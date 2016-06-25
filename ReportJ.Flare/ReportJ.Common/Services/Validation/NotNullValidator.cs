using ReportJ.Common.Interfaces;

namespace ReportJ.Common.Services.Validation
{
    public class NotNullValidator : ICustomValidator<object>
    {
        public string Message { get; }

        private readonly Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidator _validator;

        public NotNullValidator(string message = null)
        {
            _validator = new Microsoft.Practices.EnterpriseLibrary.Validation.Validators.NotNullValidator();
            Message = message ?? "Object cannot be null.";
        }

        public bool Validate(object applicant)
        {
            var results = _validator.Validate(applicant);
            return results.IsValid;
        }
    }
}
