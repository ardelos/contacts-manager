namespace ContactsManager.API.Middleware
{
    using Microsoft.AspNetCore.Builder;
    public static class ConfigureExceptionsExtension
    {
        public static void ConfigureExceptionsHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionsHandler>();
        }
    }
}
