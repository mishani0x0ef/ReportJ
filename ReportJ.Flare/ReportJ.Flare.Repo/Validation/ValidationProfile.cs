using FluentValidation.Configuration;
using ReportJ.Flare.Common.Interfaces;

namespace ReportJ.Flare.Repo.Validation
{
    public class ValidationProfile : IValidationProfile
    {
        public IValidationConfiguration Configuration { get; }

        public ValidationProfile(IValidationConfiguration config)
        {
            Configuration = config;
            Configure();
        }

        public void Configure()
        {
            Configuration.Register(new NetworkCredentialValidator());
        }
    }
}
