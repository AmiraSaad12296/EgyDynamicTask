using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientForm.BL.DTO
{
      public class ClientDTO
      {
            public string Name { get; set; }
            public string Description { get; set; }
            public string Job { get; set; }
            public string EnteredBy { get; set; }
            public DateTime EntryDate { get; set; }
            public string LastModificationBy { get; set; }
            public DateTime LastModificationIn { get; set; }
            public string SalesMan { get; set; }
            public string ClientSource { get; set; }
            public string ClientClass { get; set; }
        }
    }
