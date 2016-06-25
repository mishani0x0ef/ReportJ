using System.Linq;
using ReportJ.Common.Exceptions;
using ReportJ.Common.Interfaces;

namespace ReportJ.Common.Services
{
    public class Validator : IValidator
    {
        public IValidator ValidateAndThrow<T>(T applicant)
        {
            var results = Microsoft.Practices.EnterpriseLibrary.Validation.Validation.Validate(applicant);
            if (results.IsValid)
            {
                return this;
            }

            var message = string.Join("\n", results.Select(r => r.Message));
            throw new ValidationException<T>(applicant, message);
        }

        public bool Validate<T>(T applicant)
        {
            var results = Microsoft.Practices.EnterpriseLibrary.Validation.Validation.Validate(applicant);
            return results.IsValid;
        }

        public IValidator ValidateAndThrow<T>(T applicant, ICustomValidator<T> customValidator)
        {
            var isValid = customValidator.Validate(applicant);
            if (!isValid)
            {
                throw new ValidationException<T>(applicant, customValidator.Message);
            }
            return this;
        }

        public bool Validate<T>(T applicant, ICustomValidator<T> customValidator)
        {
            return customValidator.Validate(applicant);
        }
    }
}
