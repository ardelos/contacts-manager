using ContactsManager.Infrastructure;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;

namespace ContractsManager.Tests.Context
{
    public abstract class DbContextInMemory : IDisposable
    {
        private const string InMemoryConnectionString = "DataSource=:memory:";
        private readonly SqliteConnection connection;

        protected readonly DataContext DbContext;

        protected DbContextInMemory()
        {
            connection = new SqliteConnection(InMemoryConnectionString);
            connection.Open();
            var options = new DbContextOptionsBuilder<DataContext>()
                    .UseSqlite(connection)
                    .Options;
            DbContext = new DataContext(options);
            DbContext.Database.EnsureCreated();

        }

        public void Dispose()
        {
            connection.Close();
        }
    }
}
