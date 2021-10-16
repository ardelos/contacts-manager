using ClientManager.API.Controllers;
using ContactsManager.Services.Dto;
using ContactsManager.Services.Interfaces;
using ContractsManager.Tests.Context;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace ContractsManager.Tests
{
    public class ContactsManagerServiceUnitTests : DbContextInMemory
    {
        private readonly Mock<IContactsManagerService> contactManagerService;
        public ContactsManagerServiceUnitTests()
        {
            contactManagerService = new Mock<IContactsManagerService>();

            contactManagerService.Setup(p => p.CreateContactAsync(It.IsAny<ContactDto>())).ReturnsAsync(It.IsAny<ContactDto>());
        }
        [Fact]
        public async Task  GetContactTest()
        {
            var contactDto = new ContactDto() 
            { Id = 1, FirstName="John", Surname = " Doe", DateOfBirth = DateTime.Now, Email = "email@test.com" };


            contactManagerService.Setup(p => p.GetContactAsync(1)).ReturnsAsync(contactDto);
            ContactsController controller = new ContactsController(contactManagerService.Object);
            var actionResult = await controller.GetContact(1);
            OkObjectResult okResult = actionResult.Result as OkObjectResult;

            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

            Assert.Equal(contactDto, okResult.Value);
        }

    }
}
