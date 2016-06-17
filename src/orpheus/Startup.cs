using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Glimpse;
using System.Data.Entity;
using orpheus.Infrastructure;
using orpheus.Core.Interface;
using orpheus.Core;

namespace orpheus
{
    public class Startup
    {
        public IHostingEnvironment Enviroment { get; set; }
        public IConfiguration Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            Enviroment = env;
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(s => Configuration);
            services.AddGlimpse();
            services.AddScoped<PersephoneDB>(
                s => new PersephoneDB(Configuration["Data:CMS:ConnectionString"]));
            services.AddScoped<KompasDB>(
                s => new KompasDB(Configuration["Data:KOMPAS:ConnectionString"]));
            services.AddScoped<GridDB>(
                s => new GridDB(Configuration["Data:GRID:ConnectionString"]));
            services.AddScoped<ITact, KompasMstTactLoader>();
            services.AddScoped<IBoard, TrialChecker>();
            services.AddScoped<IDailyRepository, DailyInfoRepository>();
            services.AddScoped<DailyIteratorService>();
            services.AddScoped<StatisticService>();
            services.AddMvc().AddJsonOptions(o =>
            {
                o.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                o.SerializerSettings.Formatting = Enviroment.IsDevelopment() ? Formatting.Indented : Formatting.None;

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("");
            }
            app.UseGlimpse();
            app.UseIISPlatformHandler();
            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{*anything}",
                    defaults: new { action = "Index" }
                    );

                //routes.MapRoute("fallback", "{*anything}", new { controller = "Home", action = "Index" });
            });
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
