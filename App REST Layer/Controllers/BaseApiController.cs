using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using App_Data_Layer.Repositories.Interfaces;
using Newtonsoft.Json;

namespace App_REST_Layer.Controllers
{
    [EnableCors(origins:"*", headers: "*", methods:"*")]
    public class BaseApiController<T> : ApiController
    {
        protected IRepository<T> Repository;

        public BaseApiController(IRepository<T> repository)
        {
            Repository = repository;
        }

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
