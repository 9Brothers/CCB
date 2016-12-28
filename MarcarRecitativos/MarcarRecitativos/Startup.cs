using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MarcarRecitativos.Startup))]
namespace MarcarRecitativos
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
