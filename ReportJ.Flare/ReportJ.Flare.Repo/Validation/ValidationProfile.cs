using FluentValidation.Configuration;

namespace ReportJ.Flare.Repo.Validation
{
    public class ValidationProfile : AbstractValidationProfile
    {
        public ValidationProfile(IValidationConfiguration config) : base(config)
        {
            Configure();
        }

        public void Configure()
        {
            Configuration.Register(new NetworkCredentialValidator());
        }
    }
}
