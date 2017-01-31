using AutoMapper;
using ReportJ.Flare.Repo.Entities;

namespace ReportJ.Flare.Api.Models.Mapping
{
    public class GeneralMappingProfile : Profile
    {
        public GeneralMappingProfile()
        {
            CreateMap<Commit, CommitModel>();
        }
    }
}
