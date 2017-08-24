using System.Web.Http;
using Microsoft.Owin.Security.OAuth;

namespace App_REST_Layer
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // CORS Enabled to allow requests from other sources than this app (this is gonna be a public REST API)
            // found it on https://docs.microsoft.com/en-us/aspnet/web-api/overview/security/enabling-cross-origin-requests-in-web-api
            // also need to decorate the controllers
            config.EnableCors();

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
