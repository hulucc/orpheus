namespace orpheus.Infrastructure.Models.Kompas
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("KOMPAS.LINE_INFO")]
    public partial class LINE_INFO
    {
        [Key]
        public decimal LINE_ID { get; set; }

        [StringLength(20)]
        public string LINE_NAME { get; set; }

        public decimal? FLOOR_ID { get; set; }

        public decimal? ORGANI_ID { get; set; }

        public decimal? AB_FLAG { get; set; }

        [StringLength(100)]
        public string NOTE { get; set; }
    }
}
