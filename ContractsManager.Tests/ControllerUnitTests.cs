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
    public class ControllerUnitTests : DbContextInMemory
    {
        private readonly Mock<IContactsManagerService> contactManagerService;
        public ControllerUnitTests()
        {
            contactManagerService = new Mock<IContactsManagerService>();
        }
        [Fact]
        public async Task  GetContactTest()
        {
            var contactDto = new ContactDto() 
            { Id = 1, FirstName="John", Surname = " Doe", DateOfBirth = DateTime.Now, Email = "email@test.com" };


            contactManagerService.Setup(p => p.GetContactAsync(1)).ReturnsAsync(contactDto);
            ContactsController controller = new ContactsController(contactManagerService.Object);
            var actionResult = await controller.GetContact(1);
            var okResult = actionResult.Result as OkObjectResult;

            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

            Assert.Equal(contactDto, okResult.Value);
        }
        [Fact]
        public async Task CreateContact()
        {
            var contactDto = new ContactDto()
            { Id = 1, FirstName = "John", Surname = " Doe", DateOfBirth = DateTime.Now, Email = "email@test.com" };


            contactManagerService.Setup(p => p.CreateContactAsync(contactDto)).ReturnsAsync(contactDto);
            ContactsController controller = new ContactsController(contactManagerService.Object);
            var actionResult = await controller.CreateContact(contactDto);
            var createdResult = actionResult.Result as ObjectResult;

            Assert.NotNull(createdResult);
            Assert.Equal(201, createdResult.StatusCode);

            Assert.Equal(contactDto, createdResult.Value);
        }

        [Fact]
        public async Task UpdateContact()
        {

            var changed = new ContactDto()
            { Id = 1, FirstName = "Johnx", Surname = " Doe", DateOfBirth = DateTime.Now, Email = "email@test.com" };

            contactManagerService.Setup(p => p.UpdateContactAsync(changed, 1)).ReturnsAsync(changed);
            ContactsController controller = new ContactsController(contactManagerService.Object);
            var actionResult = await controller.UpdateContact(changed, 1);
            var createdResult = actionResult.Result as ObjectResult;

            Assert.NotNull(createdResult);
            Assert.Equal(200, createdResult.StatusCode);

            Assert.Equal(changed, createdResult.Value);
        }
    }
}
