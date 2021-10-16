namespace ContactsManager.API.Middleware
{
    using Newtonsoft.Json;
    public class ExceptionResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }


        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
