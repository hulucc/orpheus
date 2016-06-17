using orpheus.Core.Interface;
using orpheus.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Core
{
    public class DailyIteratorService
    {
        private IEnumerable<string> m_lines = new List<string>();
        private readonly IDailyRepository m_dailyRepo;

        public DailyIteratorService(IDailyRepository dailyRepo)
        {
            m_dailyRepo = dailyRepo;
        }

        //help
        private List<PspDailyInfo> DailyInDay(DateTime day)
        {
            return m_dailyRepo.GetByDateAndLines(day, m_lines)?.ToList() ?? new List<PspDailyInfo>();
        }
        private List<PspDailyInfo> DailyInWeek(IEnumerable<DateTime> week)
        {
            var start = week.Min();
            var end = week.Max();
            return m_dailyRepo.GetByDateSpanAndLines(start, end, m_lines)?.ToList() ?? new List<PspDailyInfo>();
        }
        private List<PspDailyInfo> DailyInMonth(DateTime month)
        {
            var start = new DateTime(month.Year, month.Month, 1);
            var end = start.AddMonths(1).AddDays(-1.0);
            return m_dailyRepo.GetByDateSpanAndLines(start, end, m_lines)?.ToList() ?? new List<PspDailyInfo>();
        }
        private IEnumerable<DateTime> DayInMonth(DateTime month)
        {
            var first = new DateTime(month.Year, month.Month, 1);
            for (var d = first; d.Month == month.Month; d = d.AddDays(1.0))
                yield return d;
        }
        private IEnumerable<IEnumerable<DateTime>> WeekInMonth(DateTime month)
        {
            var week = new List<DateTime>();
            foreach (var day in DayInMonth(month))
            {
                week.Add(day);
                if(day.DayOfWeek == DayOfWeek.Sunday)
                {
                    yield return week;
                    week = new List<DateTime>();
                }
            }
            if (week.Count > 0)
                yield return week;
        }
        private IEnumerable<DateTime> MonthInYear(DateTime year)
        {
            var m = new DateTime(year.Year, 4, 1);
            for (int i = 0; i < 12; i++)
                yield return m.AddMonths(i);
        }

        private int Compare(DayOfWeek dayA, DayOfWeek dayB)
        {
            if (dayA == DayOfWeek.Sunday && dayB == DayOfWeek.Sunday)
                return 0;
            else if (dayA == DayOfWeek.Sunday)
                return 1;
            else if (dayB == DayOfWeek.Sunday)
                return -1;
            else
                return dayA - dayB;
        }

        //api
        public List<IEnumerable<PspDailyInfo>> MonthByDay(DateTime month, IEnumerable<string> lines)
        {
            m_lines = lines;
            return DayInMonth(month)
                .Select(day => DailyInDay(day).AsEnumerable())
                .ToList();
        }
        public List<IEnumerable<PspDailyInfo>> MonthByWeek(DateTime month, IEnumerable<string> lines)
        {
            m_lines = lines;
            return WeekInMonth(month)
                .Select(week => DailyInWeek(week).AsEnumerable())
                .ToList();
        }
        public List<IEnumerable<PspDailyInfo>> YearByMonth(DateTime year, IEnumerable<string> lines)
        {
            m_lines = lines;
            return MonthInYear(year)
                .Select(month => DailyInMonth(month).AsEnumerable())
                .ToList();
        }
    }
}
