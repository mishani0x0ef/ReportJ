using System.Collections.Generic;

namespace ReportJ.Flare.Repo.Interfaces
{
    public interface IEntityMapper
    {
        /// <summary>
        /// Map entity to other type.
        /// </summary>
        TDest Map<TSource, TDest>(TSource source);

        /// <summary>
        /// Map collection of entities to other type.
        /// </summary>
        IEnumerable<TDest> Map<TSource, TDest>(IEnumerable<TSource> source);
    }
}
