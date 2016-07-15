using FluentValidation;

namespace ReportJ.Flare.Repo.Validation
{
    public class UrlValidator : ValidatorBase<string>
    {
        protected override void InitializeValidation()
        {
            RuleFor(url => url).NotNull().Length(6, 255);
        }
    }
}
