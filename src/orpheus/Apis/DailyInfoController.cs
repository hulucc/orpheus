using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using orpheus.Infrastructure;
using orpheus.Core.Interface;
using System.Text.RegularExpressions;
using orpheus.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Reflection;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace orpheus.Apis
{
    [Route("api/[controller]")]
    public class DailyInfoController : Controller
    {
        private readonly IDailyRepository m_dailyRepo;
        private readonly DailyIteratorService m_dailyIter;
        private readonly StatisticService m_statistic;
        private readonly TraceService m_trace;
        private readonly IMemoryCache m_memCache;

        public DailyInfoController(
            IMemoryCache memCache,
            IDailyRepository dailyRepo,
            DailyIteratorService dailyIter,
            StatisticService statistic,
            TraceService trace)
        {
            m_memCache = memCache;
            m_dailyRepo = dailyRepo;
            m_dailyIter = dailyIter;
            m_statistic = statistic;
            m_trace = trace;
        }

        //helper
        private bool CheckLine(string line)
        {
            return Regex.IsMatch(line, @"^[D]?\d\d$");
        }
        private DateTime ParseDate(string date)
        {
            DateTime result;
            DateTime.TryParse(date, out result);
            return result; 
        }

        [HttpGet("get")]
        public IActionResult Get([FromQuery]decimal id)
        {
            var dailyInfo = m_dailyRepo.GetById(id);
            return Json(dailyInfo);
        }

        [HttpGet("query")]
        public IActionResult Get([FromQuery]string line, [FromQuery]string date)
        {
            var queryDate = ParseDate(date);
            if (queryDate == DateTime.MinValue)
                return BadRequest();
            else if (!CheckLine(line))
                return BadRequest();
            var dailyInfos = m_dailyRepo
                .GetByDateAndLines(queryDate, new[] { line });
            return Json(dailyInfos);
        }

        [HttpGet("dict")]
        public IActionResult GetDicts()
        {
            var dicts = m_dailyRepo.GetDicts();
            return Json(dicts);
        }

        [HttpGet("statistic")]
        public IActionResult GetStatistics(
            [FromQuery]string type, 
            [FromQuery]string date,
            [FromQuery]string lines)
        {
            List<PspStatistic> stats = null;
            //cache
            //var key = this.Url;
            //var opts = new MemoryCacheEntryOptions()
            //    .SetSlidingExpiration(TimeSpan.FromMinutes(5))
            //    .SetAbsoluteExpiration(TimeSpan.FromHours(1));
            //if(m_memCache.try)


            var pdate = ParseDate(date);
            if (pdate == DateTime.MinValue)
                return BadRequest();
            var plines = lines.Split(',').Select(l => l.Trim());
            if (plines.Any(l => !CheckLine(l)))
                return BadRequest();
            var bindingFlag = BindingFlags.IgnoreCase | BindingFlags.Instance | BindingFlags.Public;
            var iter = m_dailyIter.GetType().GetMethod(type, bindingFlag);
            if (iter == null)
                return BadRequest();
            var dailyGroup = iter
                .Invoke(m_dailyIter, new object[] { pdate, plines }) 
                as List<IEnumerable<PspDailyInfo>>;
            stats = dailyGroup
                .Select(dailys => m_statistic.Summarize(dailys))
                .ToList();
            return Json(stats);
        }

        [HttpGet("planinfo")]
        public IActionResult GetPlanInfo([FromQuery]string id)
        {
            var ids = id.Split(',').Select(i => Convert.ToDecimal(i));
            var traces = m_trace.GetPlans(ids);
            return Json(traces);
        }

        [HttpGet("timeline")]
        public IActionResult GetTimeLine([FromQuery]string id)
        {
            var ids = id.Split(',').Select(i => Convert.ToDecimal(i));
            var traces = m_trace.GetTimeLines(ids);
            return Json(traces);
        }

        // GET api/values/5
        //[HttpGet("{id}")]
        //public IActionResult Get(int id)
        //{

        //}

        // GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
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
