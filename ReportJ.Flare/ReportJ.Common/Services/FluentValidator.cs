using System;
using ReportJ.Common.Interfaces;

namespace ReportJ.Common.Services
{
    //todo: implement Fluent based validator using FluentValidation.Configuration as factory. MR
    public class FluentValidator : IValidator
    {
        public IValidator ValidateAndThrow<T>(T applicant)
        {
            throw new NotImplementedException();
        }

        public bool Validate<T>(T applicant)
        {
            throw new NotImplementedException();
        }
    }
}
