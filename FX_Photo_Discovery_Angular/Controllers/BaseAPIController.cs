using System.Net;
using System.Net.Http;
using System.Text;
using FX_Photo_Discovery_Angular.DbContext;
using System.Web.Http;
using Newtonsoft.Json;

namespace FX_Photo_Discovery_Angular.Controllers
{
    public class BaseApiController : ApiController
    {
        protected readonly UserDBEntities UserDb = new UserDBEntities();

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
