using App_Data_Layer.Repositories.Interfaces;

namespace App_Data_Layer.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IEnhancedUsersDbContext context) : base(context)
        {
        }
    }
}
