using System;

namespace Jira.Extension.RepositoryApi.Extensions
{
    public static class DateTimeExtension
    {
        public static double ToUnixTimestamp(this DateTime date)
        {
            var origin = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            var diff = date - origin;
            return Math.Floor(diff.TotalMilliseconds);
        }
    }
}