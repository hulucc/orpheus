namespace orpheus.Core
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("cms.PspDict")]
    public partial class PspDict
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PspDict()
        {
            //PspDailyInfoes = new HashSet<PspDailyInfo>();
            //PspDailyInfoes1 = new HashSet<PspDailyInfo>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal Recid { get; set; }

        [StringLength(30)]
        public string State { get; set; }

        [StringLength(30)]
        public string ShiftGroup { get; set; }

        [StringLength(30)]
        public string Shift { get; set; }

        public decimal? ShiftStartTime { get; set; }

        public decimal? ShiftEndTime { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<PspDailyInfo> PspDailyInfoes { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<PspDailyInfo> PspDailyInfoes1 { get; set; }
    }
}
