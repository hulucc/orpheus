using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Moq;
using orpheus.Core.Interface;
using orpheus.Core;
using Xunit.Abstractions;

namespace orpheus.Tests
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class Services
    {
        private readonly ITestOutputHelper m_output;

        public Services(ITestOutputHelper output)
        {
            m_output = output;
        }

        private PspDailyInfo GetMockDailyInfo()
        {
            var p1 = new PspPlanInfo()
            {
                Recid = 1514,
                Kishname = "YAS069800",
                Kibaname = "B-6593",
                Lot = "018",
                SLot = "1",
                Koutei = "2R",
                SLotUncomp = 225,
                LotComp = 0,
                ShiftComp = 51,
                LotCompAfter = 51,
                Append = -174,
                Joc = "",
                CleanCount = "",
                Remark = ""
            };
            var p2 = new PspPlanInfo()
            {
                Recid = 1515,
                Kishname = "YAS072900",
                Kibaname = "B-6600",
                Lot = "007",
                SLot = "1",
                Koutei = "2R",
                SLotUncomp = 66,
                LotComp = 0,
                ShiftComp = 33,
                LotCompAfter = 33,
                Append = 0,
                Joc = "",
                CleanCount = "",
                Remark = ""
            };
            var t1 = new PspTimeLine() { Recid = 4528, Line = "13", State = 1, StartTime = "2016/05/25 14:00:00", EndTime = "2016/05/25 17:00:00", Dismension = "", DailyID = 765 };
            var t2 = new PspTimeLine() { Recid = 4529, Line = "13", State = 1, StartTime = "2016/05/25 17:00:00", EndTime = "2016/05/25 17:10:00", Dismension = "P 试作", DailyID = 765 };
            var t3 = new PspTimeLine() { Recid = 4530, Line = "13", State = 2, StartTime = "2016/05/25 17:10:00", EndTime = "2016/05/25 17:20:00", Dismension = "", DailyID = 765 };
            var t4 = new PspTimeLine() { Recid = 4531, Line = "13", State = 3, StartTime = "2016/05/25 17:20:00", EndTime = "2016/05/25 17:30:00", Dismension = "", DailyID = 765 };
            var t5 = new PspTimeLine() { Recid = 4532, Line = "13", State = 4, StartTime = "2016/05/25 17:30:00", EndTime = "2016/05/25 17:40:00", Dismension = "A 清扫", DailyID = 765 };
            var t6 = new PspTimeLine() { Recid = 4533, Line = "13", State = 4, StartTime = "2016/05/25 17:40:00", EndTime = "2016/05/25 17:50:00", Dismension = "B 早礼", DailyID = 765 };
            var t7 = new PspTimeLine() { Recid = 4534, Line = "13", State = 4, StartTime = "2016/05/25 17:50:00", EndTime = "2016/05/25 18:00:00", Dismension = "C 切替等待", DailyID = 765 };
            var t8 = new PspTimeLine() { Recid = 4535, Line = "13", State = 4, StartTime = "2016/05/25 18:00:00", EndTime = "2016/05/25 18:10:00", Dismension = "D 部品分割等待", DailyID = 765 };
            var t9 = new PspTimeLine() { Recid = 4536, Line = "13", State = 4, StartTime = "2016/05/25 18:10:00", EndTime = "2016/05/25 18:20:00", Dismension = "E 定数", DailyID = 765 };
            var ta = new PspTimeLine() { Recid = 4537, Line = "13", State = 4, StartTime = "2016/05/25 18:20:00", EndTime = "2016/05/25 18:30:00", Dismension = "F 修理品等待", DailyID = 765 };
            var tb = new PspTimeLine() { Recid = 4538, Line = "13", State = 4, StartTime = "2016/05/25 18:30:00", EndTime = "2016/05/25 18:40:00", Dismension = "G 前工程等待", DailyID = 765 };
            var tc = new PspTimeLine() { Recid = 4539, Line = "13", State = 4, StartTime = "2016/05/25 18:40:00", EndTime = "2016/05/25 18:50:00", Dismension = "H 操作员等待", DailyID = 765 };
            var td = new PspTimeLine() { Recid = 4540, Line = "13", State = 4, StartTime = "2016/05/25 18:50:00", EndTime = "2016/05/25 19:00:00", Dismension = "I 条形码打印等待", DailyID = 765 };
            var te = new PspTimeLine() { Recid = 4541, Line = "13", State = 4, StartTime = "2016/05/25 19:00:00", EndTime = "2016/05/25 19:10:00", Dismension = "J 日班对应等待", DailyID = 765 };
            var tf = new PspTimeLine() { Recid = 4542, Line = "13", State = 4, StartTime = "2016/05/25 19:10:00", EndTime = "2016/05/25 19:20:00", Dismension = "K VR等待", DailyID = 765 };
            var tg = new PspTimeLine() { Recid = 4543, Line = "13", State = 4, StartTime = "2016/05/25 19:20:00", EndTime = "2016/05/25 19:30:00", Dismension = "L 部品等待", DailyID = 765 };
            var th = new PspTimeLine() { Recid = 4544, Line = "13", State = 4, StartTime = "2016/05/25 19:30:00", EndTime = "2016/05/25 19:40:00", Dismension = "M 基板等待", DailyID = 765 };
            var ti = new PspTimeLine() { Recid = 4545, Line = "13", State = 4, StartTime = "2016/05/25 19:40:00", EndTime = "2016/05/25 19:50:00", Dismension = "N 修理等待", DailyID = 765 };
            var tj = new PspTimeLine() { Recid = 4546, Line = "13", State = 4, StartTime = "2016/05/25 19:50:00", EndTime = "2016/05/25 20:00:00", Dismension = "O 炉温等待", DailyID = 765 };
            var tk = new PspTimeLine() { Recid = 4547, Line = "13", State = 4, StartTime = "2016/05/25 20:00:00", EndTime = "2016/05/25 20:10:00", Dismension = "P 试作", DailyID = 765 };
            var tl = new PspTimeLine() { Recid = 4548, Line = "13", State = 4, StartTime = "2016/05/25 20:10:00", EndTime = "2016/05/25 20:20:00", Dismension = "Q 切替", DailyID = 765 };
            var tm = new PspTimeLine() { Recid = 4549, Line = "13", State = 4, StartTime = "2016/05/25 20:20:00", EndTime = "2016/05/25 20:30:00", Dismension = "R 立上对应", DailyID = 765 };
            var tn = new PspTimeLine() { Recid = 4550, Line = "13", State = 4, StartTime = "2016/05/25 20:30:00", EndTime = "2016/05/25 20:40:00", Dismension = "S 无计划", DailyID = 765 };
            var to = new PspTimeLine() { Recid = 4551, Line = "13", State = 4, StartTime = "2016/05/25 20:40:00", EndTime = "2016/05/25 20:50:00", Dismension = "T VR切替", DailyID = 765 };
            var tp = new PspTimeLine() { Recid = 4552, Line = "13", State = 4, StartTime = "2016/05/25 20:50:00", EndTime = "2016/05/25 21:00:00", Dismension = "U CF异常", DailyID = 765 };
            var tq = new PspTimeLine() { Recid = 4553, Line = "13", State = 4, StartTime = "2016/05/25 21:00:00", EndTime = "2016/05/25 21:10:00", Dismension = "V 部品确认", DailyID = 765 };
            var tr = new PspTimeLine() { Recid = 4554, Line = "13", State = 4, StartTime = "2016/05/25 21:10:00", EndTime = "2016/05/25 21:20:00", Dismension = "W 喷嘴保养", DailyID = 765 };
            var ts = new PspTimeLine() { Recid = 4555, Line = "13", State = 4, StartTime = "2016/05/25 21:20:00", EndTime = "2016/05/25 21:30:00", Dismension = "X 炉温上升", DailyID = 765 };
            var tt = new PspTimeLine() { Recid = 4556, Line = "13", State = 4, StartTime = "2016/05/25 21:30:00", EndTime = "2016/05/25 21:40:00", Dismension = "Y 201堆板检查", DailyID = 765 };
            var tu = new PspTimeLine() { Recid = 4557, Line = "13", State = 4, StartTime = "2016/05/25 21:40:00", EndTime = "2016/05/25 21:50:00", Dismension = "Z 品质故障", DailyID = 765 };
            var tv = new PspTimeLine() { Recid = 4558, Line = "13", State = 4, StartTime = "2016/05/25 21:50:00", EndTime = "2016/05/25 22:00:00", Dismension = "其它", DailyID = 765 };

            var d = new PspDailyInfo()
            {
                Recid = 765,
                Line = "13",
                Date = "2016/05/25",
                Operator = "hulucc",
                Shift = 3,
                ShiftGroup = 2,
                StartTime = "2016/05/25 14:00:00",
                EndTime = "2016/05/25 22:00:00",
                Confirming = "hulucc",
                ConfirmTime = "2016/05/25 22:02:11",
                PspPlanInfoes = new List<PspPlanInfo> { p1, p2 },
                PspTimeLines = new List<PspTimeLine> { t1, t2, t3, t4, t5, t6, t7, t8, t9, ta, tb, tc, td, te, tf, tg, th, ti, tj, tk, tl, tm, tn, to, tp, tq, tr, ts, tt, tu, tv }
            };
            return d;
        }

        private ITact GetMockTact()
        {
            var m = new Mock<ITact>();
            m.Setup(t => t.GetByPlan("YAS069800", "B-6593", "018", "1", "2R")).Returns(25);
            m.Setup(t => t.GetByPlan("YAS072900", "B-6600", "007", "1", "2R")).Returns(30);
            return m.Object;
        }

        private ITact GetMockTactException()
        {
            var m = new Mock<ITact>();
            m.Setup(t => t.GetByPlan("YAS069800", "B-6593", "018", "1", "2R")).Throws<Exception>();
            m.Setup(t => t.GetByPlan("YAS072900", "B-6600", "007", "1", "2R")).Throws<Exception>();
            return m.Object;
        }

        private IBoard GetMockBoard()
        {
            var m = new Mock<IBoard>();
            m.Setup(t => t.IsTrial("YAS069800", "B-6593")).Returns(false);
            m.Setup(t => t.IsTrial("YAS072900", "B-6600")).Returns(true);
            return m.Object;
        }

        private IBoard GetMockBoardException()
        {
            var m = new Mock<IBoard>();
            m.Setup(t => t.IsTrial("YAS069800", "B-6593")).Throws<Exception>();
            m.Setup(t => t.IsTrial("YAS072900", "B-6600")).Throws<Exception>();
            return m.Object;
        }

        private IDailyRepository GetMockDailyRepository()
        {
            var m = new Mock<IDailyRepository>();
            var lines = new[] { "12", "13" };
            var date1 = DateTime.Parse("2016/06/01");
            var date2 = DateTime.Parse("2016/06/05");
            var date3 = DateTime.Parse("2016/06/27");
            var date4 = DateTime.Parse("2016/06/30");
            var daily1 = new PspDailyInfo { Recid = 1 };
            var daily2 = new PspDailyInfo { Recid = 2 };
            var daily3 = new PspDailyInfo { Recid = 3 };
            m.Setup(repo => repo.GetByDateAndLines(It.IsAny<DateTime>(), lines)).Returns(new PspDailyInfo[] { });
            m.Setup(repo => repo.GetByDateSpanAndLines(It.IsAny<DateTime>(), It.IsAny<DateTime>(), lines)).Returns(new PspDailyInfo[] { });
            m.Setup(repo => repo.GetByDateAndLines(date1, lines)).Returns(new[] { daily1 });
            m.Setup(repo => repo.GetByDateAndLines(date2, lines)).Returns(new[] { daily2 });
            m.Setup(repo => repo.GetByDateAndLines(date4, lines)).Returns(new[] { daily3 });
            m.Setup(repo => repo.GetByDateSpanAndLines(date1, date2, lines)).Returns(new[] { daily1, daily2 });
            m.Setup(repo => repo.GetByDateSpanAndLines(date3, date4, lines)).Returns(new[] { daily3 });
            m.Setup(repo => repo.GetByDateSpanAndLines(date1, date4, lines)).Returns(new[] { daily1, daily2, daily3 });
            return m.Object;
        }

        private IDailyRepository GetMockDailyRepositoryNull()
        {
            var m = new Mock<IDailyRepository>();
            m.Setup(repo => repo.GetByDateAndLines(
                It.IsAny<DateTime>(), 
                It.IsAny<IEnumerable<string>>()))
                .Returns((IEnumerable<PspDailyInfo>)null);
            m.Setup(repo => repo.GetByDateSpanAndLines(
                It.IsAny<DateTime>(),
                It.IsAny<DateTime>(),
                It.IsAny<IEnumerable<string>>()))
                .Returns((IEnumerable<PspDailyInfo>)null);
            return m.Object;

        }

        private List<decimal> GetTrace(PspStatisticTrace trace, string pname)
        {
            return trace.TraceInfoes[pname] as List<decimal>;
        }

        [Fact]
        public void PspStatisticService_SummarizeDaily()
        {
            var tact = GetMockTact();
            var board = GetMockBoard();
            var daily = GetMockDailyInfo();
            var service = new StatisticService(tact, board);
            var statistic = service.Summarize(daily);
            //model
            var model = statistic;
            Assert.Equal(435, model.TotalTime);
            Assert.Equal(21.25m, model.TheoreticalTime);
            Assert.Equal(10, model.NoPlan);
            Assert.Equal(60, model.ModelChange);
            Assert.Equal(40, model.Inspection);
            Assert.Equal(20, model.Trial);
            Assert.Equal(0, model.PartChange);
            Assert.Equal(40, model.Fault);
            Assert.Equal(120, model.Waiting);
            Assert.Equal(425, model.EffectiveTime);
            Assert.Equal(305, model.ActualTime);
            m_output.WriteLine("{0}: {1:P2}", nameof(model.Productivity), model.Productivity);
            m_output.WriteLine("{0}: {1:P2}", nameof(model.MachineActivation), model.MachineActivation);
            //model trace
            
            //detail
            var detail = statistic.Detail;
            Assert.Equal(435, detail.TotalTime);
            Assert.Equal(21.25m, detail.TheoreticalTime);
            Assert.Equal(10, detail.NoPlan);
            Assert.Equal(20, detail.Change);
            Assert.Equal(10, detail.VRChange);
            Assert.Equal(10, detail.ChangeWaiting);
            Assert.Equal(10, detail.Acceptance);
            Assert.Equal(10, detail.ReflowTempRise);
            Assert.Equal(20, detail.Morning);
            Assert.Equal(10, detail.NozzleMaintainance);
            Assert.Equal(10, detail.ReflowTempWaiting);
            Assert.Equal(0, detail.InstrucmentCorrection);
            Assert.Equal(0, detail.MachineMaintainance);
            Assert.Equal(20, detail.Trial);
            Assert.Equal(20, detail.RepairWaiting);
            Assert.Equal(10, detail.QualityIssue);
            Assert.Equal(10, detail.PreStepWaiting);
            Assert.Equal(10, detail.PartWaiting);
            Assert.Equal(10, detail.PartSplitWaiting);
            Assert.Equal(10, detail.VRWaiting);
            Assert.Equal(10, detail.OperatorWaiting);
            Assert.Equal(10, detail.CFFault);
            Assert.Equal(10, detail.BoardWaiting);
            Assert.Equal(60, detail.Others);
            //DetailTrace
            var dtrace = detail.Trace;
            Assert.Equal(new List<decimal> { 765 }, GetTrace(dtrace, nameof(detail.TotalTime)));
            Assert.Equal(new List<decimal> { 1514 }, GetTrace(dtrace, nameof(detail.TheoreticalTime)));
            Assert.Equal(new List<decimal> { 4550 }, GetTrace(dtrace, nameof(detail.NoPlan)));
            Assert.Equal(new List<decimal> { 4531, 4548 }, GetTrace(dtrace, nameof(detail.Change)));
            Assert.Equal(new List<decimal> { 4551 }, GetTrace(dtrace, nameof(detail.VRChange)));
            Assert.Equal(new List<decimal> { 4534 }, GetTrace(dtrace, nameof(detail.ChangeWaiting)));
            Assert.Equal(new List<decimal> { 4536 }, GetTrace(dtrace, nameof(detail.Acceptance)));
            Assert.Equal(new List<decimal> { 4555 }, GetTrace(dtrace, nameof(detail.ReflowTempRise)));
            Assert.Equal(new List<decimal> { 4532, 4533 }, GetTrace(dtrace, nameof(detail.Morning)));
            Assert.Equal(new List<decimal> { 4554 }, GetTrace(dtrace, nameof(detail.NozzleMaintainance)));
            Assert.Equal(new List<decimal> { 4546 }, GetTrace(dtrace, nameof(detail.ReflowTempWaiting)));
            Assert.False(dtrace.TraceInfoes.ContainsKey(nameof(detail.InstrucmentCorrection)));
            Assert.False(dtrace.TraceInfoes.ContainsKey(nameof(detail.MachineMaintainance)));
            Assert.Equal(new List<decimal> { 4529, 4547 }, GetTrace(dtrace, nameof(detail.Trial)));
            Assert.Equal(new List<decimal> { 4530, 4545 }, GetTrace(dtrace, nameof(detail.RepairWaiting)));
            Assert.Equal(new List<decimal> { 4557 }, GetTrace(dtrace, nameof(detail.QualityIssue)));
            Assert.Equal(new List<decimal> { 4538 }, GetTrace(dtrace, nameof(detail.PreStepWaiting)));
            Assert.Equal(new List<decimal> { 4543 }, GetTrace(dtrace, nameof(detail.PartWaiting)));
            Assert.Equal(new List<decimal> { 4535 }, GetTrace(dtrace, nameof(detail.PartSplitWaiting)));
            Assert.Equal(new List<decimal> { 4542 }, GetTrace(dtrace, nameof(detail.VRWaiting)));
            Assert.Equal(new List<decimal> { 4539 }, GetTrace(dtrace, nameof(detail.OperatorWaiting)));
            Assert.Equal(new List<decimal> { 4552 }, GetTrace(dtrace, nameof(detail.CFFault)));
            Assert.Equal(new List<decimal> { 4544 }, GetTrace(dtrace, nameof(detail.BoardWaiting)));
            Assert.Equal(new List<decimal> { 4537, 4540, 4541, 4553, 4556, 4558 }, GetTrace(dtrace, nameof(detail.Others)));
        }

        [Fact]
        public void PspStatisticService_SummarizeDailys()
        {
            var tact = GetMockTact();
            var board = GetMockBoard();
            var daily = GetMockDailyInfo();
            var service = new StatisticService(tact, board);
            var single = service.Summarize(daily);
            var multi = service.Summarize(new List<PspDailyInfo> { daily, daily });
            Assert.Equal(single.TotalTime * 2, multi.TotalTime);
            Assert.Equal(single.NoPlan * 2, multi.NoPlan);
            Assert.Equal(single.Trial * 2, multi.Trial);
            Assert.Equal(single.ModelChange * 2, multi.ModelChange);
            Assert.Equal(single.TheoreticalTime * 2, multi.TheoreticalTime);
            Assert.Equal(single.Productivity, multi.Productivity);
            Assert.Equal(single.MachineActivation, multi.MachineActivation);
            Assert.Equal(GetTrace(single.Trace, nameof(PspStatistic.ModelChange)).Count * 2, GetTrace(multi.Trace, nameof(PspStatistic.ModelChange)).Count);
        }

        [Fact]
        public void PspStatisticService_SumarizeDailyIsTrialException()
        {
            var tact = GetMockTact();
            var board = GetMockBoardException();
            var daily = GetMockDailyInfo();
            var service = new StatisticService(tact, board);
            var statistic = service.Summarize(daily);
            Assert.Equal(1, service.Errors.Count);
            Assert.Equal(1, statistic.Trace.Errors.Count);
        }

        [Fact]
        public void PspStatisticService_SumarizeDailyGetTackException()
        {
            var tact = GetMockTactException();
            var board = GetMockBoard();
            var daily = GetMockDailyInfo();
            var service = new StatisticService(tact, board);
            var statistic = service.Summarize(daily);
            Assert.Equal(1, service.Errors.Count);
            Assert.Equal(1, statistic.Trace.Errors.Count);
        }

        [Fact]
        public void DailyIteratorService_MonthByDay()
        {
            var dailyRepo = GetMockDailyRepository();
            var dailyIter = new DailyIteratorService(dailyRepo);
            var date = DateTime.Parse("2016/06");
            var lines = new[] { "12", "13" };
            var result = dailyIter.MonthByDay(date, lines);
            Assert.Equal(30, result.Count);
            var day1 = result[1 - 1];
            var day2 = result[2 - 1];
            var day30 = result[30 - 1];
            Assert.Equal(new decimal[] { 1 }, day1.Select(d => d.Recid));
            Assert.Equal(new decimal[] { }, day2.Select(d => d.Recid));
            Assert.Equal(new decimal[] { 3 }, day30.Select(d => d.Recid));
        }

        [Fact]
        public void DailyIteratorService_MonthByWeek()
        {
            var dailyRepo = GetMockDailyRepository();
            var dailyIter = new DailyIteratorService(dailyRepo);
            var date = DateTime.Parse("2016/06");
            var lines = new[] { "12", "13" };
            var result = dailyIter.MonthByWeek(date, lines);
            Assert.Equal(5, result.Count);
            var week1 = result[1 - 1];
            var week2 = result[2 - 1];
            var week5 = result[5 - 1];
            Assert.Equal(new decimal[] { 1, 2 }, week1.Select(d => d.Recid));
            Assert.Equal(new decimal[] { }, week2.Select(d => d.Recid));
            Assert.Equal(new decimal[] { 3 }, week5.Select(d => d.Recid));
        }

        [Fact]
        public void DailyIteratorService_YearByMonth()
        {
            var dailyRepo = GetMockDailyRepository();
            var dailyIter = new DailyIteratorService(dailyRepo);
            var year = DateTime.Parse("2016/01");
            var lines = new[] { "12", "13" };
            var result = dailyIter.YearByMonth(year, lines);
            Assert.Equal(12, result.Count);
            var april = result[4 - 4];
            var june = result[6 - 4];
            Assert.Equal(new decimal[] { }, april.Select(d => d.Recid));
            Assert.Equal(new decimal[] { 1, 2, 3 }, june.Select(d => d.Recid));
        }

        [Fact]
        public void DailyIteratorService_MonthByDayNull()
        {
            var dailyRepo = GetMockDailyRepositoryNull();
            var dailyIter = new DailyIteratorService(dailyRepo);
            var date = DateTime.Parse("2016/06");
            var lines = new[] { "12", "13" };
            var result = dailyIter.MonthByDay(date, lines);
            Assert.Equal(30, result.Count);
            var day1 = result[1 - 1];
            var day2 = result[2 - 1];
            var day30 = result[30 - 1];
            Assert.Equal(new decimal[] { }, day1.Select(d => d.Recid));
            Assert.Equal(new decimal[] { }, day2.Select(d => d.Recid));
            Assert.Equal(new decimal[] { }, day30.Select(d => d.Recid));
        }

        [Fact]
        public void DailyIteratorService_MonthByWeekNull()
        {
            var dailyRepo = GetMockDailyRepositoryNull();
            var dailyIter = new DailyIteratorService(dailyRepo);
            var date = DateTime.Parse("2016/06");
            var lines = new[] { "12", "13" };
            var result = dailyIter.MonthByWeek(date, lines);
            Assert.Equal(5, result.Count);
            var week1 = result[1 - 1];
            var week2 = result[2 - 1];
            var week5 = result[5 - 1];
            Assert.Equal(new decimal[] { }, week1.Select(d => d.Recid));
            Assert.Equal(new decimal[] { }, week2.Select(d => d.Recid));
            Assert.Equal(new decimal[] { }, week5.Select(d => d.Recid));
        }

        [Fact]
        public void DailyIteratorService_YearByMonthNull()
        {
            var dailyRepo = GetMockDailyRepositoryNull();
            var dailyIter = new DailyIteratorService(dailyRepo);
            var year = DateTime.Parse("2016/01");
            var lines = new[] { "12", "13" };
            var result = dailyIter.YearByMonth(year, lines);
            Assert.Equal(12, result.Count);
            var april = result[4 - 4];
            var june = result[6 - 4];
            Assert.Equal(new decimal[] { }, april.Select(d => d.Recid));
            Assert.Equal(new decimal[] { }, june.Select(d => d.Recid));
        }
    }
}
