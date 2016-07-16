using FluentValidation.Configuration;

namespace ReportJ.Flare.Repo.Validation
{
    public class Configurator
    {
        public bool ValidationConfigured { get; set; }

        private readonly IValidationConfiguration _configuration;

        public Configurator(IValidationConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Configure()
        {
            _configuration.RegisterFor(new NetworkCredentialValidator());

            ValidationConfigured = true;
        }
    }
}
