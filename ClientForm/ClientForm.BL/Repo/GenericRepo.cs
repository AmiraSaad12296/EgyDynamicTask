using ClientForm.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientForm.BL.Repo
{
    public class GenericRepo <TEntity> where TEntity : class
    {
            ClientFormContext db;

            public GenericRepo( ClientFormContext db)
            {
                this.db = db;
            }

            public List<TEntity> selectall()
            {
                return db.Set<TEntity>().ToList();
            }

            public TEntity selectbyid(int id)
            {
                return db.Set<TEntity>().Find(id);
            }

            public void add(TEntity? entity)
            {
                db.Set<TEntity>().Add(entity);

            }

            public void update(TEntity entity)
            {
                db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            }

            public void delete(int id)
            {
                TEntity obj = db.Set<TEntity>().Find(id);
                db.Set<TEntity>().Remove(obj);
            }

        public IEnumerable<TEntity> GetPaged(int page, int pageSize)
        {
            return db.Set<TEntity>()
                     .Skip((page - 1) * pageSize)
                     .Take(pageSize)
                     .ToList();
        }

        public int Count()
        {
            return db.Set<TEntity>().Count();
        }

    }
}

