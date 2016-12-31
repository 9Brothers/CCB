using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using MarcarRecitativos.Models;

namespace MarcarRecitativos.Controllers
{
  [RoutePrefix("api/Recitativos")]
  public class RecitativosController : ApiController
  {
    private CcbContext db = new CcbContext();

    // GET: api/Recitativos
    public async Task<IList<Recitativo>> GetRecitativos()
    {
      return await db.Recitativos.ToListAsync();
    }
    
    // GET: api/Recitativos/ByDate/{date}
    [Route("ByDate/{day}/{month}/{year}")]
    [HttpGet]
    [ActionName("ByDate")]
    public async Task<IHttpActionResult> ByDate(int day, int month, int year)
    {
      var recitativos = await
        (from r in db.Recitativos
         where r.Date.Year == year && r.Date.Month == month && r.Date.Day == day
         select new
         {
           recitativoGuid = r.RecitativoGUID,
           gender = r.Gender,
           total = r.Total,
           date = r.Date
         }).ToListAsync();


      return Json(recitativos);
    }

    // POST: api/Recitativos/
    [Route("")]
    [HttpPost]
    [ResponseType(typeof(Recitativo))]
    public async Task<IHttpActionResult> PostRecitativo(Recitativo recitativo)
    {
      recitativo.RecitativoGUID = Guid.NewGuid();
      recitativo.Date = DateTime.Now;

      if (!ModelState.IsValid) return Json(new { status = "NOK", message = "Continuação não foi criada." });

      db.Recitativos.Add(recitativo);
      await db.SaveChangesAsync();

      return Json(new
      {
        recitativoGuid = recitativo.RecitativoGUID,
        gender = recitativo.Gender,
        total = recitativo.Total,
        date = recitativo.Date
      });
    }

    // PUT: api/Recitativos/Update/{guid}
    [Route("Update/{guid}")]
    [HttpPut]    
    [ResponseType(typeof(void))]
    public async Task<IHttpActionResult> PutRecitativo(string guid, Recitativo updateRecitativo)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var parseGuid = Guid.Parse(guid);
      var recitativo = await db.Recitativos.FirstOrDefaultAsync(r => r.RecitativoGUID == parseGuid);
      recitativo.Gender = updateRecitativo.Gender;
      recitativo.Total = updateRecitativo.Total;      

      if (recitativo == null)
      {
        return BadRequest();
      }

      db.Entry(recitativo).State = EntityState.Modified;

      try
      {
        await db.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!RecitativoExists(recitativo.RecitativoID))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return Json(new
      {
        recitativoGuid = recitativo.RecitativoGUID,
        gender = recitativo.Gender,
        total = recitativo.Total,
        date = recitativo.Date
      });
    }

    // DELETE: api/Recitativos/Delete/{guid}
    [Route("Delete/{guid}")]
    [HttpDelete]
    [ResponseType(typeof(Recitativo))]
    public async Task<IHttpActionResult> DeleteRecitativo(string guid)
    {
      var parseGuid = Guid.Parse(guid);
      var recitativo = await db.Recitativos.FirstOrDefaultAsync(r => r.RecitativoGUID == parseGuid);
      if (recitativo == null)
      {
        return NotFound();
      }

      db.Recitativos.Remove(recitativo);
      await db.SaveChangesAsync();

      return Ok(recitativo);
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

    private bool RecitativoExists(int id)
    {
      return db.Recitativos.Count(e => e.RecitativoID == id) > 0;
    }
  }
}