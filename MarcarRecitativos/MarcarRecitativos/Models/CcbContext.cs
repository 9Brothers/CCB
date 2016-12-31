using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MarcarRecitativos.Models
{
  public class CcbContext : DbContext
  {
    public CcbContext() : base("Data Source=HEBER-SERVER;Initial Catalog=CcbDb;Integrated Security=True")
    { }

    public DbSet<Recitativo> Recitativos { get; set; }
  }
}