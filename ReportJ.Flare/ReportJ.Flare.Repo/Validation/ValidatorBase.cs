using FluentValidation;

namespace ReportJ.Flare.Repo.Validation
{
    public abstract class ValidatorBase<T> : AbstractValidator<T>
    {
        protected ValidatorBase()
        {
            InitializeValidation();
        }

        protected abstract void InitializeValidation();
    }
}
