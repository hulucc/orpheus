namespace orpheus.Infrastructure.Models.Kompas
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("KOMPAS.SLOTDATA")]
    public partial class SLOTDATA
    {
        [Key]
        public decimal ID { get; set; }

        [StringLength(30)]
        public string BOARD { get; set; }

        [StringLength(30)]
        public string MODEL { get; set; }

        [StringLength(10)]
        public string PRO_NO { get; set; }

        [StringLength(20)]
        public string LOT { get; set; }

        [StringLength(5)]
        public string SLOT { get; set; }

        [StringLength(5)]
        public string SSLOT { get; set; }

        public decimal PROCESSORG_ID { get; set; }

        public DateTime SHIP_DATE { get; set; }

        public decimal F_KIND { get; set; }

        public decimal LOT_QTY { get; set; }

        public decimal QTY { get; set; }

        public decimal SLOT_START { get; set; }

        public decimal BOTH { get; set; }

        public decimal BOARD_QTY { get; set; }

        public decimal PERMIT { get; set; }

        public decimal SIZE_Y { get; set; }

        [StringLength(10)]
        public string BADMARK { get; set; }

        [StringLength(100)]
        public string SHIPDATE_NOTE { get; set; }

        [StringLength(30)]
        public string BKC { get; set; }

        public decimal? SLOT_FIX { get; set; }

        public DateTime? PARTS_START_DATE { get; set; }

        [StringLength(10)]
        public string REV_DATE { get; set; }

        public decimal? SUM_BKC { get; set; }

        public decimal? SUM_REV { get; set; }

        public virtual ICollection<SLOTSCHEDULE> SLOTSCHEDULEs { get; set; }
    }
}
