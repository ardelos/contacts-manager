using ContactsManager.Infrastructure.Models;
using ContactsManager.Services;
using ContactsManager.Services.Exceptions;
using ContactsManager.Services.Interfaces;
using ContractsManager.Tests.Context;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace ContractsManager.Tests
{
    public class ServiceUnitTest : DbContextInMemory
    {
        private readonly IContactsManagerService contactManagerService;

        public ServiceUnitTest()
        {
            contactManagerService = new ContactsManagerService(DbContext);
        }

        [Fact]
        public async Task TestGetContactAsync()
        {
            await AddOneContact(true);
            var contact = await contactManagerService.GetContactAsync(1);
            Assert.NotNull(contact);
            Assert.Equal(1, contact.Id);
        }

        [Fact]
        public async Task TestGetContactNotFoundAsync()
        {
            await AddOneContact(true);

            await Assert.ThrowsAsync<NotFoundException>(() =>contactManagerService.GetContactAsync(2));

        }

        async Task AddOneContact(bool clear = false )
        {
            if (clear)
            {
                DbContext.Clear(DbContext.Contacts);
            }
            var contact_one = new Contact() { Id = 1, FirstName = "John", Surname = "Doe", DateOfBirth = DateTime.Now.AddYears(-25), Email = "email@test.com" };
            DbContext.Contacts.Add(contact_one);
            await DbContext.SaveChangesAsync();
        }
    }
}
