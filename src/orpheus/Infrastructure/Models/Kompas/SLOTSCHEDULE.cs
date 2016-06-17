namespace orpheus.Infrastructure.Models.Kompas
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("KOMPAS.SLOTSCHEDULE")]
    public partial class SLOTSCHEDULE
    {
        [Key]
        [Column(Order = 0)]
        public decimal SLOT_ID { get; set; }

        public decimal PROCESSORG_ID { get; set; }

        [Key]
        [Column(Order = 1)]
        public decimal PROCESS_ID { get; set; }

        public decimal LINE_ID { get; set; }

        public decimal TACT { get; set; }

        [StringLength(4)]
        public string TACT_FLAG { get; set; }

        public decimal? TACT_LINE_ID { get; set; }

        public decimal? RATE { get; set; }

        public decimal? Z_COUNT { get; set; }

        public decimal TIME_FUKA { get; set; }

        public decimal TIME_CHG { get; set; }

        public decimal? TIME_CHG_EXP { get; set; }

        public decimal TIME_TOTAL { get; set; }

        public DateTime DATE_START { get; set; }

        public DateTime DATE_START_PRO { get; set; }

        public DateTime DATE_END { get; set; }

        public decimal? SLOT_FIX { get; set; }

        [StringLength(100)]
        public string NOTE_ONE { get; set; }

        [StringLength(100)]
        public string NOTE { get; set; }

        public decimal? NOTE_MODE { get; set; }

        [ForeignKey("SLOT_ID")]
        public virtual SLOTDATA SLOTDATA { get; set; }

        [ForeignKey("LINE_ID")]
        public virtual LINE_INFO LINE_INFO { get; set; }
    }
}
