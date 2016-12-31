using System;
using System.ComponentModel.DataAnnotations;

namespace MarcarRecitativos.Models
{
  public class Recitativo
  {
    [Key]
    public int RecitativoID { get; set; }    
    public Guid RecitativoGUID { get; set; }
    public Gender Gender { get; set; }
    public int Total { get; set; }
    public DateTime Date { get; set; }
  }
}