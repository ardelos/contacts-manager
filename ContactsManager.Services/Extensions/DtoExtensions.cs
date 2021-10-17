namespace ContactsManager.Services.Extensions
{
    using Infrastructure.Models;
    using Dto;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Data Transfer Object Extension Methods
    /// </summary>
    public static class DtoExtensions
    {
        public static ContactDto ToDto(this Contact client)
        {
            return new ContactDto
            {
                Id = client.Id,
                FirstName = client.FirstName,
                Surname = client.Surname,
                DateOfBirth = client.DateOfBirth,
                Email = client.Email
            };
        }

        public static IEnumerable<ContactDto> ToDto(this IEnumerable<Contact> clients)
        {
            return clients.Select(c => c.ToDto());
        }

        public static Contact FromDto(this ContactDto dto)
        {
            return new Contact
            {
                FirstName = dto.FirstName,
                Surname = dto.Surname,
                DateOfBirth = dto.DateOfBirth,
                Email = dto.Email
            };
        }

        public static IEnumerable<Contact> FromDto(this IEnumerable<ContactDto> clients)
        {
            return clients.Select(c => c.FromDto());
        }

    }
}
