using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Infrastructure
{
    using Oracle.ManagedDataAccess.EntityFramework;
    using Oracle.ManagedDataAccess.Client;
    using System.Data.Entity;

    class OracleDbConfiguration : DbConfiguration
    {
        public OracleDbConfiguration()
        {
            SetDefaultConnectionFactory(new OracleConnectionFactory());
            SetProviderServices("Oracle.ManagedDataAccess.Client", EFOracleProviderServices.Instance);
            SetProviderFactory("Oracle.ManagedDataAccess.Client", OracleClientFactory.Instance);
        }
    }
}
