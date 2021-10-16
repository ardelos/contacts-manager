namespace ContactsManager.Infrastructure
{
    using Infrastructure.Models;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    public class DataContext : DbContext
    {
        public DataContext()
        {

        }
        public DataContext(DbContextOptions<DataContext> options)
                  : base(options)
        {
        }
        public virtual DbSet<Contact> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Contact>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Contact>().HasData(
                new Contact
                {
                    Id = 1,
                    FirstName = "John",
                    Surname = "Doe",
                    Email = "jdoe@hotmail.com",
                    DateOfBirth = new System.DateTime(1977, 5, 12)
                },
                new Contact
                {
                    Id = 2,
                    FirstName = "Colin",
                    Surname = "McQuire",
                    Email = "cquire@outlook.com",
                    DateOfBirth = new System.DateTime(1979, 2,2 )
                },
                new Contact
                {
                    Id = 3,
                    FirstName = "Helen",
                    Surname = "Smith",
                    Email = "smithh@olxer.net",
                    DateOfBirth = new System.DateTime(1989, 9, 10)
                }

            );
        }
    }
}
