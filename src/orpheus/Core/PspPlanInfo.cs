namespace orpheus.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("cms.PspPlanInfo")]
    public partial class PspPlanInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal Recid { get; set; }

        public decimal DailyID { get; set; }

        [Required]
        [StringLength(50)]
        public string Kishname { get; set; }

        [Required]
        [StringLength(50)]
        public string Kibaname { get; set; }

        [Required]
        [StringLength(50)]
        public string Lot { get; set; }

        [Required]
        [StringLength(50)]
        public string Koutei { get; set; }

        [Required]
        [StringLength(50)]
        public string SLot { get; set; }

        public decimal SLotUncomp { get; set; }

        public decimal LotComp { get; set; }

        public decimal ShiftComp { get; set; }

        public decimal LotCompAfter { get; set; }

        public decimal Append { get; set; }

        [StringLength(30)]
        public string Joc { get; set; }

        [StringLength(30)]
        public string CleanCount { get; set; }

        [StringLength(50)]
        public string Remark { get; set; }

        public virtual PspDailyInfo PspDailyInfo { get; set; }
    }
}
