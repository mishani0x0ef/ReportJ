using System.Net;
using FluentValidation;

namespace ReportJ.Flare.Repo.Validation
{
    public class NetworkCredentialValidator : ValidatorBase<NetworkCredential>
    {
        protected override void InitializeValidation()
        {
            When(cred => cred == null, () => RuleFor(cred => cred).NotNull());

            When(cred => cred != null, () =>
            {
                RuleFor(cred => cred.UserName).Length(1, 255);
                RuleFor(cred => cred.Password).Length(1, 255);
            });
        }
    }
}
