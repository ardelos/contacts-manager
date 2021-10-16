using System;

namespace ContactsManager.Services.Exceptions
{
    public class ExceptionBase : Exception
    {
        public int StatusCode { get; private set; }
        public string Output { get; private set; }
        public string Log { get; private set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="statusCode"> Response Status code </param>
        /// <param name="output">Return message from failed call</param>
        /// <param name="log">if set message to log, otherwise output</param>
        /// <param name="ex">exception if exist</param>
        public ExceptionBase(int statusCode, string output = null, string log = null, Exception ex = null) : base(log, ex)
        {
            StatusCode = statusCode;
            Log = log ?? output;
            Output = output;
        }
    }
}
