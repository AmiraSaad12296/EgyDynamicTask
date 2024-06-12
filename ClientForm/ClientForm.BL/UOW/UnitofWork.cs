using ClientForm.BL.Repo;
using ClientForm.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientForm.BL.UOW
{
    public class UnitofWork
    {
        ClientFormContext db;
        GenericRepo<Client> clientsRepository;
        public UnitofWork(ClientFormContext db)
        {
            this.db = db;
        }

        public GenericRepo<Client> ClientsRepository
        {
            get
            {
                if (clientsRepository == null)
                {
                    clientsRepository = new GenericRepo<Client>(db);

                }
                return clientsRepository;
            }
        }
        public void savechanges()
        {
            db.SaveChanges();
        }
    }
}

