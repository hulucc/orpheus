using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Core.Interface
{
    public interface ITact
    {
        decimal GetByPlan(string kishname, string kibaname, string lot, string slot, string koutei);

    }
}
