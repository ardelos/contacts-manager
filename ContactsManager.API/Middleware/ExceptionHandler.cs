namespace ContactsManager.API.Middleware
{
    using Services.Exceptions;
    using Microsoft.AspNetCore.Http;
    using System;
    using System.Net;
    using System.Threading.Tasks;

    public class ExceptionsHandler
    {
        private readonly RequestDelegate next;

        public ExceptionsHandler(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await next(httpContext);
            }
            catch (ExceptionBase ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, ExceptionBase exception)
        {
            if (exception.InnerException != null)
            {
                return HandleExceptionAsync(context, exception.InnerException);
            }
            context.Response.ContentType = "text/plain";
            context.Response.StatusCode = exception.StatusCode;
            return context.Response.WriteAsync(exception.Output);

        }
        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "text/plain";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            return context.Response.WriteAsync($"{exception.Message}");
        }
    }
}
