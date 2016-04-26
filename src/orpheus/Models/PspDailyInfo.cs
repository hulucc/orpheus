namespace orpheus.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("cms.PspDailyInfo")]
    public partial class PspDailyInfo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PspDailyInfo()
        {
            PspPlanInfoes = new HashSet<PspPlanInfo>();
            PspTimeLines = new HashSet<PspTimeLine>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal Recid { get; set; }

        [Required]
        [StringLength(30)]
        public string Line { get; set; }

        [Required]
        [StringLength(10)]
        public string Date { get; set; }

        [Required]
        [StringLength(30)]
        public string Operator { get; set; }

        public decimal Shift { get; set; }

        public decimal ShiftGroup { get; set; }

        [Required]
        [StringLength(19)]
        public string StartTime { get; set; }

        [Required]
        [StringLength(19)]
        public string EndTime { get; set; }

        [StringLength(30)]
        public string Confirming { get; set; }

        [StringLength(19)]
        public string ConfirmTime { get; set; }

        [ForeignKey("Shift")]
        public virtual PspDict PspShiftDict { get; set; }

        [ForeignKey("ShiftGroup")]
        public virtual PspDict PspShiftGroupDict { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PspPlanInfo> PspPlanInfoes { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PspTimeLine> PspTimeLines { get; set; }
    }
}
