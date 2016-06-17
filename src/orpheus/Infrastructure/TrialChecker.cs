using orpheus.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Infrastructure
{
    public class TrialChecker : IBoard
    {
        private GridDB m_grid;

        public TrialChecker(GridDB grid)
        {
            m_grid = grid;
        }

        public enum ProductType
        {
            Product = 1,
            Trial = 2,
            RepairPart = 3,
        }

        public ProductType GetProductType(string kishname, string kibaname)
        {
            var flag = m_grid.CAMMASTERs
                .Where(p => p.MODEL == kishname && p.BOARD == kibaname)
                .Select(p => p.PRODUCT_FLAG)
                .First()
                .Value;
            return (ProductType)flag;
        }

        public bool IsTrial(string kishname, string kibaname)
        {
            return GetProductType(kishname, kibaname) == ProductType.Trial;
        }
    }
}
