using System;

namespace ContactsManager.Services.Exceptions
{
    public class NotFoundException : ExceptionBase
    {
        public NotFoundException(string output = null, string log = null, Exception ex = null) : base(404, output, log, ex)
        {
        }
    }
}
