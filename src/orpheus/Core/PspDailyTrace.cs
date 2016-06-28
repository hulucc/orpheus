using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Core
{
    [NotMapped]
    public class PspPlanInfoTrace: PspPlanInfo
    {
        public decimal Tact { get; set; }
        public bool IsTrial { get; set; }
    }

    [NotMapped]
    public class PspTimeLineTrace: PspTimeLine
    {

    }
}
