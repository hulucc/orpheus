using orpheus.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using orpheus.Core;
using System.Data.Entity;

namespace orpheus.Infrastructure
{
    public class DailyInfoRepository : IDailyRepository
    {
        private readonly PersephoneDB m_db;

        public DailyInfoRepository(PersephoneDB db)
        {
            m_db = db;
        }

        public IEnumerable<PspDailyInfo> GetByDateAndLines(DateTime date, IEnumerable<string> lines)
        {
            var dateStr = date.ToString(@"yyyy\/MM\/dd");
            return m_db.PspDailyInfoes
                .Include(p => p.PspPlanInfoes)
                .Include(p => p.PspTimeLines)
                .Include(p => p.PspShiftDict)
                .Include(p => p.PspShiftGroupDict)
                .Where(p => p.Date == dateStr && lines.Contains(p.Line));
        }

        public IEnumerable<PspDailyInfo> GetByDateSpanAndLines(DateTime startDate, DateTime endDate, IEnumerable<string> lines)
        {
            var start = startDate.ToString(@"yyyy\/MM\/dd");
            var end = endDate.ToString(@"yyyy\/MM\/dd");
            return m_db.PspDailyInfoes
                .Include(p => p.PspPlanInfoes)
                .Include(p => p.PspTimeLines)
                .Include(p => p.PspShiftDict)
                .Include(p => p.PspShiftGroupDict)
                .Where(p => p.Date.CompareTo(start) >= 0 && 
                    p.Date.CompareTo(end) <= 0 &&
                    lines.Contains(p.Line));
        }

        public PspDailyInfo GetById(decimal id)
        {
            return m_db.PspDailyInfoes
                .Include(p => p.PspPlanInfoes)
                .Include(p => p.PspTimeLines)
                .Include(p => p.PspShiftDict)
                .Include(p => p.PspShiftGroupDict)
                .Where(p => p.Recid == id)
                .Single();
        }

        public IEnumerable<PspDict> GetDicts()
        {
            return m_db.PspDicts;
        }
    }
}
