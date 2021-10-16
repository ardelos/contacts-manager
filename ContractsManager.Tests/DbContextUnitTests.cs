
namespace ContractsManager.Tests
{
    using ContactsManager.Infrastructure.Models;
    using ContractsManager.Tests.Context;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Threading.Tasks;
    using Xunit;

    public class DbContextUnitTests : DbContextInMemory
    {
        [Fact]
        public async Task DatabaseIsAvailableAndCanBeConnectedTo()
        {
            Assert.True(await DbContext.Database.CanConnectAsync());
        }

        [Fact]
        public void FirstNameIsRequired()
        {
            var contact_one = new Contact() { Surname = " Doe", DateOfBirth = DateTime.Now, Email = "email@test.com" };
            DbContext.Contacts.Add(contact_one);
            Assert.Throws<DbUpdateException>(() => DbContext.SaveChanges());
        }

        [Fact]
        public void SurnameIsRequired()
        {
            var contact_one = new Contact() { FirstName = "John", DateOfBirth = DateTime.Now, Email = "email@test.com" };
            DbContext.Contacts.Add(contact_one);
            Assert.Throws<DbUpdateException>(() => DbContext.SaveChanges());
        }


        [Fact]
        public void EmailIsRequired()
        {
            var contact_one = new Contact() { FirstName = "John", Surname = " Doe", DateOfBirth = DateTime.Now};
            DbContext.Contacts.Add(contact_one);
            Assert.Throws<DbUpdateException>(() => DbContext.SaveChanges());
        }


        [Fact]
        public void UniqueEmail()
        {
            var contact_one = new Contact() { FirstName = "John", Surname = "Doe", DateOfBirth = DateTime.Now.AddYears(-25), Email = "email@test.com" };
            var contact_two = new Contact() { FirstName = "Dana", Surname = "Smith", DateOfBirth = DateTime.Now.AddYears(-30), Email = "email@test.com" };
            DbContext.Contacts.Add(contact_one);
            DbContext.Contacts.Add(contact_two);
            Assert.Throws<DbUpdateException>(() => DbContext.SaveChanges());
        }

        [Fact]
        public void CustomValidator()
        {
            var contact_one = new Contact() { FirstName = "John", Surname = " Doe", Email = "email@test.com", DateOfBirth = DateTime.Now.AddDays(5) };

            var validationResults = new List<ValidationResult>();
            var actual = Validator.TryValidateObject(contact_one, new ValidationContext(contact_one), validationResults, true);
            
            Assert.False(actual, "Expected validation to fail.");
            Assert.Single(validationResults);
            Assert.Same("Please input valid Date Of Birth", validationResults[0].ErrorMessage);
        }
       
    }
}
