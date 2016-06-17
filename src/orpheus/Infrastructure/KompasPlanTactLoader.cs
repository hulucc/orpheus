using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using orpheus.Core.Interface;

namespace orpheus.Infrastructure
{
    public class KompasPlanTactLoader : ITact
    {
        protected KompasDB m_kompas;

        public KompasPlanTactLoader(KompasDB kompas)
        {
            m_kompas = kompas;
        }

        public decimal GetByPlan(string kishname, string kibaname, string lot, string slot, string koutei)
        {
            var process = Helper.KouteiToProcess(koutei);
            var plan = m_kompas.SLOTSCHEDULEs
                .Include(p => p.SLOTDATA)
                .Include(p => p.LINE_INFO)
                .Where(p => p.SLOTDATA.MODEL == kishname && p.SLOTDATA.BOARD == kibaname && p.SLOTDATA.LOT == lot && p.SLOTDATA.SLOT == slot && p.PROCESS_ID == process)
                .Single();
            var tact = Math.Round(plan.TACT * plan.SLOTDATA.BOARD_QTY);
            return tact;
        }
    }
}
