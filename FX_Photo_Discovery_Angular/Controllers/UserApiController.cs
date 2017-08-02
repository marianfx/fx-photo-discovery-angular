using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using FX_Photo_Discovery_Angular.DbContext;

namespace FX_Photo_Discovery_Angular.Controllers
{
    public class UserApiController : BaseApiController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(UserDb.APPUSERS.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody] APPUSER value)
        {
            UserDb.APPUSERS.Add(value);
            return ToJson(UserDb.SaveChanges());
        }

        public HttpResponseMessage Put([FromBody] APPUSER value)
        {
            UserDb.Entry(value).State = EntityState.Modified;
            return ToJson(UserDb.SaveChanges());
        }

        public HttpResponseMessage Delete(int id)
        {
            var result = UserDb.APPUSERS.FirstOrDefault(x => x.ID == id);
            if (result == null)
                return ToJson(0);

            UserDb.APPUSERS.Remove(result);
            return ToJson(UserDb.SaveChanges());
        }
    }
}
