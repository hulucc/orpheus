using Moq;
using orpheus.Core;
using orpheus.Core.Interface;
using orpheus.Infrastructure;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace orpheus.Tests
{
    public class Repositorys
    {

        PersephoneDB m_db = new PersephoneDB("Data source=192.168.20.13;Initial catalog=CMS1;Persist security info=True;User id=cms;Password=c@pass1;MultipleActiveResultSets=True;App=EntityFramework");
        IDailyRepository m_dailyRepo;

        public Repositorys()
        {
            m_dailyRepo = new DailyInfoRepository(m_db);
        }

        [Fact]
        public void DailyRepository_GetById()
        {
            var daily = m_dailyRepo.GetById(54);
            Assert.Equal(54.0m, daily.Recid);
            Assert.Equal("13", daily.Line);
            Assert.NotNull(daily.PspPlanInfoes);
            Assert.NotNull(daily.PspTimeLines);
        }

        [Fact]
        public void DailyRepository_GetByDateAndLines()
        {
            var date = DateTime.Parse("2015/10/17");
            var dailys = m_dailyRepo.GetByDateAndLines(date, new[] { "13" });
            Assert.Equal(3, dailys.Count());
            Assert.Equal(new decimal[] { 54, 56, 58 }, dailys.Select(d => d.Recid));
        }

        [Fact]
        public void DailyRepository_GetByDateSpanAndLines()
        {
            var start = DateTime.Parse("2015/10/17");
            var end = DateTime.Parse("2015/10/18");
            var line = new[] { "13" };
            var dailys = m_dailyRepo.GetByDateSpanAndLines(start, end, line);
            Assert.Equal(4, dailys.Count());
            Assert.Equal(new decimal[] { 54, 56, 58, 60 }, dailys.Select(d => d.Recid));
        }

        [Fact]
        public void DailyRepository_GetDicts()
        {
            var dicts = m_dailyRepo.GetDicts();
            Assert.Equal(4, dicts.Count());
        }

        [Fact]
        public void DailyRepository_GetPlanById()
        {
            decimal id = 99;
            var plan = m_dailyRepo.GetPlanById(id);
            Assert.Equal(id, plan.Recid);
            Assert.Equal(54, plan.DailyID);
        }

        [Fact]
        public void DailyRepository_GetTimeLineById()
        {
            decimal id = 1;
            var tl = m_dailyRepo.GetTimeLineById(id);
            Assert.Equal(id, tl.Recid);
            Assert.Equal("12", tl.Line);
        }
    }
}
