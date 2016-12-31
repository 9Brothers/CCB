using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using MarcarRecitativos.Models;

namespace MarcarRecitativos.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using MarcarRecitativos.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Recitativo>("TesteRecitativos");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class TesteRecitativosController : ODataController
    {
        private CcbContext db = new CcbContext();

        // GET: odata/TesteRecitativos
        [EnableQuery]
        public IQueryable<Recitativo> GetTesteRecitativos()
        {
            return db.Recitativos;
        }

        // GET: odata/TesteRecitativos(5)
        [EnableQuery]
        public SingleResult<Recitativo> GetRecitativo([FromODataUri] int key)
        {
            return SingleResult.Create(db.Recitativos.Where(recitativo => recitativo.RecitativoID == key));
        }

        // PUT: odata/TesteRecitativos(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<Recitativo> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Recitativo recitativo = await db.Recitativos.FindAsync(key);
            if (recitativo == null)
            {
                return NotFound();
            }

            patch.Put(recitativo);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecitativoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(recitativo);
        }

        // POST: odata/TesteRecitativos
        public async Task<IHttpActionResult> Post(Recitativo recitativo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Recitativos.Add(recitativo);
            await db.SaveChangesAsync();

            return Created(recitativo);
        }

        // PATCH: odata/TesteRecitativos(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Recitativo> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Recitativo recitativo = await db.Recitativos.FindAsync(key);
            if (recitativo == null)
            {
                return NotFound();
            }

            patch.Patch(recitativo);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecitativoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(recitativo);
        }

        // DELETE: odata/TesteRecitativos(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            Recitativo recitativo = await db.Recitativos.FindAsync(key);
            if (recitativo == null)
            {
                return NotFound();
            }

            db.Recitativos.Remove(recitativo);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RecitativoExists(int key)
        {
            return db.Recitativos.Count(e => e.RecitativoID == key) > 0;
        }
    }
}
