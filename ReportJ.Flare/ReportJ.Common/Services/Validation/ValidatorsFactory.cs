using ReportJ.Common.Interfaces;

namespace ReportJ.Common.Services.Validation
{
    public class ValidatorsFactory
    {
        /// <summary>
        /// Create new instance of Length custom validator.
        /// </summary>
        public static ICustomValidator<string> Length(int min, int max, string message = null)
        {
            return new LengthValidator(min, max, message);
        }

        /// <summary>
        /// Create new instance of NotNull custom validator.
        /// </summary>
        public static ICustomValidator<object> NotNull(string message = null)
        {
            return new NotNullValidator(message);
        }
    }
}
