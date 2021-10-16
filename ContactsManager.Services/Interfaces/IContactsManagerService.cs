namespace ContactsManager.Services.Interfaces
{
    using Dto;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IContactsManagerService
    {
        Task<ContactDto> GetContactAsync(int id);
        Task<IEnumerable<ContactDto>> GetContactsAsync();

        Task<ContactDto> CreateContactAsync(ContactDto dto);
        Task<ContactDto> UpdateContactAsync(ContactDto dto, int id);
    }
}