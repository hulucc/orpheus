using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Data.Entity;
using orpheus.Infrastructure;
using orpheus.Core.Interface;
using System.Text.RegularExpressions;
using orpheus.Core;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace orpheus.Apis
{
    [Route("api/[controller]")]
    public class DailyInfoController : Controller
    {
        private readonly IDailyRepository m_dailyRepo;
        private readonly DailyIteratorService m_dailyIter;
        private readonly StatisticService m_statistic;

        public DailyInfoController(
            IDailyRepository dailyRepo,
            DailyIteratorService dailyIter,
            StatisticService statistic)
        {
            m_dailyRepo = dailyRepo;
            m_dailyIter = dailyIter;
            m_statistic = statistic;
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
                return HttpBadRequest();
            else if (!CheckLine(line))
                return HttpBadRequest();
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
            var parseDate = ParseDate(date);
            if (parseDate == DateTime.MinValue)
                return HttpBadRequest();
            var lineCollection = lines
                .Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(l => l.Trim());
            if (lineCollection.Any(l => !CheckLine(l)))
                return HttpBadRequest();
            List<IEnumerable<PspDailyInfo>> dailyGroup;
            if (type.Equals("MonthByDay", StringComparison.OrdinalIgnoreCase))
                dailyGroup = m_dailyIter.MonthByDay(parseDate, lineCollection);
            else if (type.Equals("MonthByWeek", StringComparison.OrdinalIgnoreCase))
                dailyGroup = m_dailyIter.MonthByWeek(parseDate, lineCollection);
            else if (type.Equals("YearByMonth", StringComparison.OrdinalIgnoreCase))
                dailyGroup = m_dailyIter.YearByMonth(parseDate, lineCollection);
            else
                return HttpBadRequest();
            var statisticCollection = dailyGroup
                .Select(dailys => m_statistic.Summarize(dailys))
                .ToList();
            return Json(statisticCollection);
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
