using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Data.Entity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace orpheus.Apis
{
    [Route("api/[controller]")]
    public class DailyInfoController : Controller
    {
        private readonly PersephoneDB m_psp;

        public DailyInfoController(PersephoneDB psp)
        {
            m_psp = psp;
        }

        // GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        [HttpGet("get")]
        public IActionResult Get(int id)
        {
            var recid = Convert.ToDecimal(id);
            var dailyInfo = m_psp.PspDailyInfoes
                .Include(p => p.PspPlanInfoes)
                .Include(p => p.PspTimeLines)
                .Include(p => p.PspShiftDict)
                .Include(p => p.PspShiftGroupDict)
                .SingleOrDefault(p => p.Recid == recid);
            return Json(dailyInfo);
        }

        [HttpGet("query")]
        public IActionResult Get([FromQuery]string line, [FromQuery]string date)
        {
            var dailyInfos = m_psp.PspDailyInfoes
                .Include(p => p.PspPlanInfoes)
                .Include(p => p.PspTimeLines)
                .Include(p => p.PspShiftDict)
                .Include(p => p.PspShiftGroupDict)
                .Where(p => p.Line == line && p.Date == date);
            return Json(dailyInfos);
        }

        [HttpGet("dict")]
        public IActionResult GetDicts()
        {
            var dict = m_psp.PspDicts;
            return Json(dict);
        }

        // GET api/values/5
        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{
            
        //}

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
