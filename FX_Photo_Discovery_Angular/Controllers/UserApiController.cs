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
            return ToJson(UserDb.AppUsers.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody] AppUser value)
        {
            UserDb.AppUsers.Add(value);
            return ToJson(UserDb.SaveChanges());
        }

        public HttpResponseMessage Put([FromBody] AppUser value)
        {
            UserDb.Entry(value).State = EntityState.Modified;
            return ToJson(UserDb.SaveChanges());
        }

        public HttpResponseMessage Delete(int id)
        {
            var result = UserDb.AppUsers.FirstOrDefault(x => x.Id == id);
            if (result == null)
                return ToJson(0);

            UserDb.AppUsers.Remove(result);
            return ToJson(UserDb.SaveChanges());
        }
    }
}
