using Microsoft.EntityFrameworkCore;

namespace ContractsManager.Tests.Context
{
    public static class DbContextExtensions
    {
        public static void Clear<T>(this DbContext context, DbSet<T> dbSet) where T : class
        {
            dbSet.RemoveRange(dbSet);
            context.SaveChangesAsync();
        }
    }
}
