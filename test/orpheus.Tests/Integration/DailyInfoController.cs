using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Newtonsoft.Json;
using orpheus.Core;
using Xunit.Abstractions;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Hosting;

namespace orpheus.Tests
{
    public class DailyInfoController
    {
        private readonly ITestOutputHelper m_output;
        private readonly TestServer m_server;

        public DailyInfoController(ITestOutputHelper output)
        {
            m_output = output;
            m_server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
        }

        //helper
        private async Task<T> RequestByGet<T>(string url)
        {
            using (var client = m_server.CreateClient())
            {
                var response = await client.GetAsync(url);
                var result = await response.Content.ReadAsStringAsync();
                Assert.False(string.IsNullOrEmpty(result));
                var obj = JsonConvert.DeserializeObject<T>(result);
                return obj;
            }
        }

        [Fact]
        public async void Get()
        {
            var url = "/api/dailyinfo/get?id=54";
            var daily = await RequestByGet<PspDailyInfo>(url);
            Assert.Equal(54, daily.Recid);
        }

        [Fact]
        public async void Query()
        {
            var url = "/api/dailyinfo/query?line=13&date=2015/10/17";
            var dailys = await RequestByGet<IEnumerable<PspDailyInfo>>(url);
            Assert.Equal(3, dailys.Count());
        }

        [Fact]
        public async void Dict()
        {
            var url = "/api/dailyinfo/dict";
            var dicts = await RequestByGet<IEnumerable<PspDict>>(url);
            Assert.Equal(4, dicts.Count());
        }

        [Fact]
        public async void Statistic()
        {
            var url1 = "/api/dailyinfo/statistic?type=monthbyday&date=2015/10&lines=12,13";
            var statistics1 = await RequestByGet<IEnumerable<PspStatistic>>(url1);
            Assert.Equal(31, statistics1.Count());
            var url2 = "/api/dailyinfo/statistic?type=monthbyweek&date=2015/10&lines=12,13";
            var statistics2 = await RequestByGet<IEnumerable<PspStatistic>>(url2);
            Assert.Equal(5, statistics2.Count());
            var url3 = "/api/dailyinfo/statistic?type=yearbymonth&date=2015/01&lines=12,13";
            var statistics3 = await RequestByGet<IEnumerable<PspStatistic>>(url3);
            Assert.Equal(12, statistics3.Count());
        }

        [Fact]
        public async void PlanInfo()
        {
            var url = "/api/dailyinfo/planinfo?id=99,100";
            var traces = await RequestByGet<IEnumerable<PspPlanInfoTrace>>(url);
            Assert.Equal(2, traces.Count());
            Assert.Equal(99, traces.First().Recid);
            Assert.NotEqual(0, traces.First().Tact);
            Assert.Equal(false, traces.First().IsTrial);
        }

        [Fact]
        public async void TimeLine()
        {
            var url = "/api/dailyinfo/timeline?id=1,2";
            var traces = await RequestByGet<IEnumerable<PspTimeLineTrace>>(url);
            Assert.Equal(2, traces.Count());
            Assert.Equal(1, traces.First().Recid);
            Assert.Equal("12", traces.First().Line);
        }
    }
}
