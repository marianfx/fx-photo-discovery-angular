using App_Data_Layer.Repositories.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Utilities;

namespace App_Data_Layer.Repositories
{
    public class Repository<T> : IRepository<T>
        where T: class
    {
        protected readonly IEnhancedUsersDbContext Context;

        protected Repository(IEnhancedUsersDbContext context)
        {
            Context = context;
        }

        public T Create(T p)
        {
            Context.Set<T>().Add(p); 
            //make this biutiful ef thing create only the object, not the inner objects all over again (just make the associations)
            foreach (var property in p.GetType().GetProperties())
            {
                if (property.GetValue(p) == null || property.PropertyType == typeof(string)) // add string because it s the same as IEnumerable
                    continue;

                if (property.GetIdProperty() != null)// here mark as unchanged the models (they have IDs)
                    Context.Entry(property.GetValue(p)).State = EntityState.Unchanged;

                if (property.PropertyType.GetInterface("IEnumerable") == null) continue;
                foreach (var item in (IEnumerable)property.GetValue(p, null))
                {
                    Context.Entry(item).State = EntityState.Unchanged;
                }
            }
            Context.SaveChanges();
            return p;
        }

        public bool Update(T p)
        {
            if (p.GetIdProperty() == null)
                throw new Exception("The type specified for the repository must have an ID field.");

            var existing = Context.Set<T>().FirstOrDefault(x => x.GetIdProperty().GetValue(x) == p.GetIdProperty().GetValue(p));
            foreach (var prop in typeof(T).GetProperties())
            {
                prop.SetValue(existing, prop.GetValue(p));

                if (prop.GetValue(existing) == null || prop.PropertyType == typeof(string)) // add string because it s the same as IEnumerable
                    continue;

                if (prop.GetIdProperty() != null)// here mark as unchanged the models
                    Context.Entry(prop.GetValue(existing)).State = EntityState.Unchanged;

                if (prop.PropertyType.GetInterface("IEnumerable") == null) continue;
                foreach (var item in (IEnumerable)prop.GetValue(existing, null))
                {
                    Context.Entry(item).State = EntityState.Unchanged;
                }
            }
            Context.Entry(existing).State = EntityState.Modified;
            return Context.SaveChanges() == 1 ? true : false;
        }

        public bool Delete(T p)
        {
            Context.Set<T>().Remove(p);
            return Context.SaveChanges() == 1 ? true : false;
        }

        public T GetById(Guid id)
        {
            return Context.Set<T>().FirstOrDefault(p => (Guid)p.GetIdProperty().GetValue(p) == id);
        }

        public IEnumerable<T> GetAll()
        {
            return Context.Set<T>();
        }
    }
}
