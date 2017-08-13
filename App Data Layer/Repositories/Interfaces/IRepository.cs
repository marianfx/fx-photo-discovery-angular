using System;
using System.Collections.Generic;

namespace App_Data_Layer.Repositories.Interfaces
{
    public interface IRepository<T>
    {
        T Create(T obj);
        bool Update(T obj);
        bool Delete(T obj);
        T GetById(Guid id);
        IEnumerable<T> GetAll();
    }
}
