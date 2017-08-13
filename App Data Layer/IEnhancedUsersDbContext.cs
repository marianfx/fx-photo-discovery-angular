using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace App_Data_Layer
{
    public interface IEnhancedUsersDbContext
    {
        //sets
        DbSet<User> Users { get; set; }

        //db ref
        Database Database { get; }

        //entities
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
        DbSet Set(System.Type entityType);
        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;

        //main save changes
        int SaveChanges();
    }
}
