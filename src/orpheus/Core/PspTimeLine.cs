namespace orpheus.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("cms.PspTimeLine")]
    public partial class PspTimeLine
    {
        [Key]
        public decimal Recid { get; set; }

        [StringLength(30)]
        public string Line { get; set; }

        public decimal State { get; set; }

        [StringLength(19)]
        public string StartTime { get; set; }

        [StringLength(19)]
        public string EndTime { get; set; }

        [StringLength(50)]
        public string Dismension { get; set; }

        public decimal? DailyID { get; set; }

        //[ForeignKey("State")]
        //public virtual PspDict PspStateDict { get; set; }

        public virtual PspDailyInfo PspDailyInfo { get; set; }
    }
}
