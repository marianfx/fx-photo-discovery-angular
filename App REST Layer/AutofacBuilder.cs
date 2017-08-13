using App_Data_Layer;
using App_Data_Layer.Repositories;
using App_Data_Layer.Repositories.Interfaces;
using Autofac;
using Autofac.Integration.WebApi;
using System.Reflection;
using System.Web.Http;

namespace App_REST_Layer
{
    public class AutofacBuilder
    {
        public static HttpConfiguration config;
        public static IContainer container;
        public static void Build(HttpConfiguration cfg = null)
        {
            //autofac
            var builder = new ContainerBuilder();
            config = cfg ?? GlobalConfiguration.Configuration;

            //register controllers
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            //register db
            builder.RegisterType<EnhancedUsersDbContext>().As<IEnhancedUsersDbContext>();

            //register repos
            //builder.RegisterType<Repository>().As<IRepository>();
            builder.RegisterType<UserRepository>().As<IUserRepository>();

            //finally specify autofac as the resolver
            container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}