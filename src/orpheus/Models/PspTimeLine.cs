namespace orpheus.Models
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
        [Column(Order = 0)]
        [StringLength(30)]
        public string Line { get; set; }

        [Key]
        [Column(Order = 1)]
        public decimal State { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(19)]
        public string StartTime { get; set; }

        [Key]
        [Column(Order = 3)]
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
