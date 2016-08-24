using FluentValidation.Configuration;

namespace ReportJ.Flare.Repo.Validation
{
    public class ValidationProfile
    {
        public bool ValidationConfigured { get; set; }

        private readonly IValidationConfiguration _configuration;

        public ValidationProfile(IValidationConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Configure()
        {
            _configuration.Register(new NetworkCredentialValidator());

            ValidationConfigured = true;
        }
    }
}
