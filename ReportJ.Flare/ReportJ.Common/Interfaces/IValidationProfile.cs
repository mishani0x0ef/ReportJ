using FluentValidation.Configuration;

namespace ReportJ.Flare.Common.Interfaces
{
    public interface IValidationProfile
    {
        IValidationConfiguration Configuration { get; } 
    }
}
