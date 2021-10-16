
namespace ContactsManager.Services.Dto
{
    using System;
    public class ContactDto 
    {
        public int Id { get; set; }
        public string Surname { get; set; }
        public string FirstName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
    }
}
