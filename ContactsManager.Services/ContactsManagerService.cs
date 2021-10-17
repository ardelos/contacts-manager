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


        /// <summary>
        /// Return list of all available contacts as Dto's
        /// </summary>
        /// <returns>List of contacts</returns>
        public async Task<IEnumerable<ContactDto>> GetContactsAsync()
        {
            var contacts = await dataContext.Contacts.ToListAsync();
            return contacts.ToDto();
        }

        /// <summary>
        /// Return contact match for id as Dto's
        /// Throw error if not found.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>ContactDto or NotFoundException</returns>
        public async Task<ContactDto> GetContactAsync(int id)
        {
            var contact = await GetContactOrThrowAsync(id);
            return contact?.ToDto();
        }

        /// <summary>
        /// Create new contact with pre and post initialisation validation;
        /// </summary>
        /// <param name="dto"></param>
        /// <returns>Created contact as Dto</returns>
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


        /// <summary>
        /// Update selected contact, if found,  with pre and post initialisation validation;
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="id"></param>
        /// <returns>Updated contact</returns>
        public async Task<ContactDto> UpdateContactAsync(ContactDto dto, int id)
        {

            await AssertEmailIsUnique(dto.Email, id);
            var contact = await GetContactOrThrowAsync(id);

            contact.FirstName = dto.FirstName;
            contact.Surname = dto.Surname;
            contact.DateOfBirth = dto.DateOfBirth;
            contact.Email = dto.Email;

            contact.AssertEntityValidationResult();

            await SaveContextAsync();
            return contact.ToDto();
        }



        /// <summary>
        /// Find contact by id or throw error if not found
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        async Task<Contact> GetContactOrThrowAsync(int id)
        {
            var contact = await dataContext.Contacts.FirstOrDefaultAsync(c => c.Id == id);
            if (contact == null)
            {
                throw new NotFoundException($"Client with Id:{id} not found");
            }
            return contact;
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

