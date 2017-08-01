using FX_Photo_Discovery_Angular.DbContext;
using System.Web.Http;

namespace FX_Photo_Discovery_Angular.Controllers
{
    public class BaseAPIController : ApiController
    {
        protected readonly UserDBEntities UserDb = new UserDBEntities();
    }
}
