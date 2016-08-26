using AutoMapper;
using ReportJ.Flare.Repo.Entities;
using System.Collections.Generic;

namespace ReportJ.Flare.Api.Models.Mapping
{
    public static class ModelMapper
    {
        private readonly static IConfigurationProvider _config;
        private static IMapper _mapper;

        static ModelMapper()
        {
            _config = new MapperConfiguration(cfg => cfg.AddProfile<GeneralMappingProfile>());
            _config.CreateMapper();
        }

        public static CommitModel ToModel(this Commit commit)
        {
            return _mapper.Map<Commit, CommitModel>(commit);
        }

        public static IEnumerable<CommitModel> ToModel(this IEnumerable<Commit> commits)
        {
            return _mapper.Map<IEnumerable<Commit>, IEnumerable<CommitModel>>(commits);
        }
    }
}