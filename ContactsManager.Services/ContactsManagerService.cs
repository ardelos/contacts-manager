namespace ContactsManager.Services
{
    using Services.Dto;
    using Services.Exceptions;
    using Services.Extensions;
    using Infrastructure;
    using Infrastructure.Models;
    using Microsoft.EntityFrameworkCore;
    using Services.Interfaces;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
 
    public class ContactsManagerService : IContactsManagerService
    {

        private readonly DataContext dataContext;
        public ContactsManagerService(DataContext context)
        {
            this.dataContext = context;
        }
        public async Task<IEnumerable<ContactDto>> GetContactsAsync()
        {
            var contacts = await dataContext.Contacts.ToListAsync();
            return contacts.ToDto();
        }
        public async Task<ContactDto> GetContactAsync(int id)
        {
            var client = await dataContext.Contacts.FirstOrDefaultAsync(c => c.Id == id);
            return client?.ToDto();
        }
        public async Task<ContactDto> CreateContactAsync(ContactDto dto)
        {
            await AssertEmailIsUnique(dto.Email);
            var contact = new Contact
            {
                FirstName = dto.FirstName,
                Surname = dto.Surname,
                DateOfBirth = dto.DateOfBirth,
                Email = dto.Email
            };
            contact.AssertEntityValidationResult();
            dataContext.Contacts.Add(contact);
            await SaveContextAsync();
            return contact.ToDto();
        }
        public async Task<ContactDto> UpdateContactAsync(ContactDto dto, int id)
        {

            await AssertEmailIsUnique(dto.Email, id);
            
            var contact = await dataContext.Contacts.FirstOrDefaultAsync(c=>c.Id == id);
            if (contact == null)
            {
                throw new NotFoundException($"Client with Id:{id} not found");
            }

            contact.FirstName = dto.FirstName;
            contact.Surname = dto.Surname;
            contact.DateOfBirth = dto.DateOfBirth;
            contact.Email = dto.Email;

            contact.AssertEntityValidationResult();

            await SaveContextAsync();
            return contact.ToDto();
        }


        /// <summary>
        /// Validate Email early to prevent constraint check error. If Email is empty entity validation will prevent saving as well
        /// </summary>
        /// <param name="email">Contact Email</param>
        /// <param name="id">Contact Id</param>
        /// <returns></returns>
        async Task AssertEmailIsUnique(string email, int? id = null)
        {
            if (string.IsNullOrEmpty(email)) return;
            var checkEmail = await dataContext.Contacts.Where(c=>id == null || c.Id != id).FirstOrDefaultAsync(c => c.Email.ToLower() == email.ToLower());
            if (checkEmail == null) return;
            throw new BadRequest($"Client with Email: {email} already exists in the database");
        }

       

        /// <summary>
        /// Save Context and custom exception handler
        /// </summary>
        /// <returns></returns>
        async Task SaveContextAsync()
        {
            try
            {
                await dataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new BadRequest(ex.Message);
            }

        }
    }
}

