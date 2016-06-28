using AutoMapper;
using orpheus.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Core
{
    public class TraceService
    {
        private readonly IDailyRepository m_dailyRepo;
        private readonly ITact m_tact;
        private readonly IBoard m_board;
        private readonly IMapper m_mapper;

        public TraceService(
            IMapper mapper,
            IDailyRepository dailyRepo, 
            ITact tact, 
            IBoard board)
        {
            m_mapper = mapper;
            m_dailyRepo = dailyRepo;
            m_tact = tact;
            m_board = board;
        }


        private decimal GetTact(PspPlanInfoTrace ptrace)
        {
            try
            {
                return m_tact.GetByPlan(ptrace.Kishname, ptrace.Kibaname, ptrace.Lot, ptrace.SLot, ptrace.Koutei);
            }
            catch (Exception)
            {
                return 0;
            }
        }

        private bool GetTrial(PspPlanInfoTrace ptrace)
        {
            try
            {
                return m_board.IsTrial(ptrace.Kishname, ptrace.Kibaname);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public IEnumerable<PspPlanInfoTrace> GetPlans(IEnumerable<decimal> ids)
        {
            return ids
                .Select(id => m_dailyRepo.GetPlanById(id))
                .Select(plan => m_mapper.Map<PspPlanInfoTrace>(plan))
                .Select(trace =>
                {
                    trace.Tact = GetTact(trace);
                    trace.IsTrial = GetTrial(trace);
                    return trace;
                });
        }

        public IEnumerable<PspTimeLineTrace> GetTimeLines(IEnumerable<decimal> ids)
        {
            return ids
                .Select(id => m_dailyRepo.GetTimeLineById(id))
                .Select(tl => m_mapper.Map<PspTimeLineTrace>(tl));
        }
    }
}
