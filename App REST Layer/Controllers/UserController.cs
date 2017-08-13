using System.Net.Http;
using System.Web.Http;
using App_Data_Layer;
using App_Data_Layer.Repositories.Interfaces;
using Utilities;

namespace FX_Photo_Discovery_Angular.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : BaseApiController<User>
    {
        public UserController(IUserRepository repository) : base(repository)
        {
        }

        public HttpResponseMessage Get()
        {
            return ToJson(Repository.GetAll());
        }

        public HttpResponseMessage Post([FromBody] User value)
        {
            User created = Repository.Create(value);
            return ToJson(created != null);
        }

        public HttpResponseMessage Put([FromBody] User value)
        {
            
            return ToJson(Repository.Update(value));
        }

        public HttpResponseMessage Delete(string id)
        {
            User foundUser = Repository.GetById(id.ParseAsGuid());
            if (foundUser != null)
                return ToJson(Repository.Delete(foundUser));
            else
                return ToJson(false);
        }
    }
}
