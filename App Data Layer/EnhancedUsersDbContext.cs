namespace App_Data_Layer
{
    public class EnhancedUsersDbContext: UsersDbContext, IEnhancedUsersDbContext
    {
        public EnhancedUsersDbContext(): base()
        {
            //add real password
            Database.Connection.ConnectionString = Database.Connection.ConnectionString.Replace("xxxx","sqldb");
        }
    }
}
