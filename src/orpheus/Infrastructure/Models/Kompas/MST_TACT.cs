namespace orpheus.Infrastructure.Models.Kompas
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("KOMPAS.MST_TACT")]
    public partial class MST_TACT
    {
        [Key, Column(Order = 0)]
        [StringLength(30)]
        public string BOARD { get; set; }

        [Key, Column(Order = 1)]
        [StringLength(30)]
        public string MODEL { get; set; }

        [StringLength(30)]
        public string PRO_NO { get; set; }

        [Key, Column(Order = 2)]
        public decimal? PROCESS_ID { get; set; }

        public decimal? LINE_ID { get; set; }

        [Key, Column(Order = 3)]
        public decimal? LINE_ORGANI_ID { get; set; }

        public decimal? TACT { get; set; }

        [StringLength(4)]
        public string TACT_FLAG { get; set; }

        public decimal? Z_COUNT { get; set; }

        public decimal? QTY_CP { get; set; }

        public decimal? QTY_IK { get; set; }

        public DateTime? REC_DATE { get; set; }
    }
}
