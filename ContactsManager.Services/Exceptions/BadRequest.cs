using System;

namespace ContactsManager.Services.Exceptions
{
    public class BadRequest : ExceptionBase
    {
        public BadRequest(string output = null, string log = null, Exception ex = null) : base(400, output, log, ex)
        {
        }

    }
}
