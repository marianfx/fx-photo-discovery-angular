using System;
using System.Linq;
using System.Reflection;

namespace Utilities
{
    public static class Extensions
    {
        public static PropertyInfo GetIdProperty(this object obj)
        {
            return obj.GetType().GetProperties().Where(x => x.Name == "Id").FirstOrDefault();
        }

        public static Guid ParseAsGuid(this string obj)
        {
            Guid newGuid = Guid.Empty;
            Guid.TryParse(obj, out newGuid);
            return newGuid;
        }
    }
}
