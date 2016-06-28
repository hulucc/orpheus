using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Core.Interface
{
    public interface IDailyRepository
    {
        PspDailyInfo GetById(decimal id);
        IEnumerable<PspDailyInfo> GetByDateAndLines(DateTime date, IEnumerable<string> lines);
        IEnumerable<PspDailyInfo> GetByDateSpanAndLines(DateTime startDate, DateTime endDate, IEnumerable<string> lines);
        IEnumerable<PspDict> GetDicts();

        PspPlanInfo GetPlanById(decimal id);
        PspTimeLine GetTimeLineById(decimal id);
    }
}
