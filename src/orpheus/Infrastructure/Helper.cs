using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Infrastructure
{
    public class Helper
    {
        public static decimal KouteiToProcess(string koutei)
        {
            if (koutei == "2R")
                return 2;
            else if (koutei == "1R")
                return 1;
            else
                throw new InvalidOperationException("no such koutei");
        }

        public static string ProcessToKoutei(decimal process)
        {
            if (process == 2)
                return "2R";
            else if (process == 1)
                return "1R";
            else
                throw new InvalidOperationException("no such process");
        }
    }
}
