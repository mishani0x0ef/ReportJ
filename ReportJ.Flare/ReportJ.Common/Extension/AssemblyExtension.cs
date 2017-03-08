using System;
using System.Reflection;
using System.Runtime.InteropServices;

namespace ReportJ.Common.Extension
{
    public static class AssemblyExtension
    {
        public static Guid GetGuid(this Assembly assembly)
        {
            if (assembly == null)
                throw new ArgumentNullException(nameof(assembly));

            var attribute = (GuidAttribute)assembly.GetCustomAttributes(typeof(GuidAttribute), true)[0];
            return new Guid(attribute.Value);
        }
    }
}
