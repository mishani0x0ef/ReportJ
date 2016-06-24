using AutoMapper;
using ReportJ.Flare.Repo.Interfaces;
using ReportJ.Flare.Repo.Services.Mapping;
using System.Collections.Generic;

namespace ReportJ.Flare.Repo.Services
{
    public class EntityMapper : IEntityMapper
    {
        private MapperConfiguration Config { get; set; }
        private IMapper Mapper { get; set; }

        public EntityMapper()
        {
            InitializeMapping();
        }

        public IEnumerable<TDest> Map<TSource, TDest>(IEnumerable<TSource> source)
        {
            if(source == null)
            {
                return null;
            }

            return Mapper.Map<IEnumerable<TDest>>(source);
        }

        public TDest Map<TSource, TDest>(TSource source)
        {
            return Mapper.Map<TDest>(source);
        }

        private void InitializeMapping()
        {
            Config = new MapperConfiguration(cfg => cfg.AddProfile<GeneralMappingProfile>());
            Mapper = Config.CreateMapper();
        }
    }
}
