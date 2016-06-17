using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.Entity;
using orpheus.Core.Interface;

namespace orpheus.Infrastructure
{
    public class KompasMstTactLoader : ITact
    {
        protected KompasDB m_kompas;

        public KompasMstTactLoader(KompasDB kompas)
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
            var mstTact = m_kompas.MST_TACTs
                .Where(p => p.MODEL == kishname && p.BOARD == kibaname && p.PROCESS_ID == process && p.LINE_ORGANI_ID == plan.LINE_INFO.ORGANI_ID)
                .Single();
            return mstTact.TACT.Value;
        }
    }
}
