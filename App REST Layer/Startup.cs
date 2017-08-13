using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(App_REST_Layer.Startup))]

namespace App_REST_Layer
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            AutofacBuilder.Build();

            app.UseAutofacMiddleware(AutofacBuilder.container);
            app.UseAutofacWebApi(AutofacBuilder.config);
            app.UseWebApi(AutofacBuilder.config);
        }
    }
}
