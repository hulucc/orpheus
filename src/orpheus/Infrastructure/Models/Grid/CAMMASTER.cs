namespace orpheus.Infrastructure.Models.Grid
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("GRID.CAMMASTER")]
    public partial class CAMMASTER
    {
        [Key]
        public decimal ID { get; set; }

        [StringLength(30)]
        public string MODEL { get; set; }

        [StringLength(30)]
        public string BOARD { get; set; }

        [StringLength(10)]
        public string B_ID { get; set; }

        [StringLength(30)]
        public string LOT { get; set; }

        public decimal? PRONUM { get; set; }

        [StringLength(20)]
        public string PCBFILENAME { get; set; }

        [StringLength(255)]
        public string CAMFILENAME { get; set; }

        public DateTime? ENTDATE { get; set; }

        [StringLength(18)]
        public string PCBPARTSNO { get; set; }

        public decimal? THICKNESS { get; set; }

        public decimal? SIZE_X { get; set; }

        public decimal? SIZE_Y { get; set; }

        public decimal? BD_NUM_X { get; set; }

        public decimal? BD_NUM_Y { get; set; }

        public decimal? BD_PITCH_X { get; set; }

        public decimal? BD_PITCH_Y { get; set; }

        public decimal? STD_POS1_X { get; set; }

        public decimal? STD_POS1_Y { get; set; }

        public decimal? STD_POS2_X { get; set; }

        public decimal? STD_POS2_Y { get; set; }

        public decimal? LSTD_POS1_X { get; set; }

        public decimal? LSTD_POS1_Y { get; set; }

        public decimal? LSTD_POS2_X { get; set; }

        public decimal? LSTD_POS2_Y { get; set; }

        public decimal? STD_MOVE_X { get; set; }

        public decimal? STD_MOVE_Y { get; set; }

        public decimal? LND_POS_X { get; set; }

        public decimal? LND_POS_Y { get; set; }

        public decimal? A1_POS_X { get; set; }

        public decimal? A1_POS_Y { get; set; }

        public decimal? A2_POS_X { get; set; }

        public decimal? A2_POS_Y { get; set; }

        public decimal? A3_POS_X { get; set; }

        public decimal? A3_POS_Y { get; set; }

        public decimal? A4_POS_X { get; set; }

        public decimal? A4_POS_Y { get; set; }

        public decimal? B1_POS_X { get; set; }

        public decimal? B1_POS_Y { get; set; }

        public decimal? B2_POS_X { get; set; }

        public decimal? B2_POS_Y { get; set; }

        public decimal? B3_POS_X { get; set; }

        public decimal? B3_POS_Y { get; set; }

        public decimal? B4_POS_X { get; set; }

        public decimal? B4_POS_Y { get; set; }

        public decimal? A_FORM { get; set; }

        [StringLength(500)]
        public string CAMNOTE { get; set; }

        public decimal? PRODUCT_FLAG { get; set; }

        public decimal? GAP { get; set; }

        [StringLength(3)]
        public string ORG_SIDE { get; set; }

        public decimal? OPPM { get; set; }

        public decimal? UB_ID { get; set; }

        public decimal? PRNMARK1_X { get; set; }

        public decimal? PRNMARK1_Y { get; set; }

        public decimal? PRNMARK2_X { get; set; }

        public decimal? PRNMARK2_Y { get; set; }

        public decimal? PRNMARK3_X { get; set; }

        public decimal? PRNMARK3_Y { get; set; }

        public decimal? PRNMARKB1_X { get; set; }

        public decimal? PRNMARKB1_Y { get; set; }

        public decimal? PRNMARKB2_X { get; set; }

        public decimal? PRNMARKB2_Y { get; set; }

        public decimal? PRNMARKB3_X { get; set; }

        public decimal? PRNMARKB3_Y { get; set; }

        public decimal? RECOG_ID_A1 { get; set; }

        public decimal? RECOG_ID_A2 { get; set; }

        public decimal? RECOG_ID_A3 { get; set; }

        public decimal? RECOG_ID_A4 { get; set; }

        public decimal? RECOG_ID_B1 { get; set; }

        public decimal? RECOG_ID_B2 { get; set; }

        public decimal? RECOG_ID_B3 { get; set; }

        public decimal? RECOG_ID_B4 { get; set; }

        public decimal? CAM_FLAG { get; set; }

        public decimal? RD { get; set; }

        public decimal? NO_HOLE { get; set; }

        [StringLength(30)]
        public string OPECODE { get; set; }

        public decimal? F_RECOG { get; set; }

        public decimal? PLATE { get; set; }

        [StringLength(100)]
        public string WORD { get; set; }

        public bool? PWBKIND { get; set; }

        public short? UB_ID_B { get; set; }

        public bool? CONFIRMATION_GAP { get; set; }

        public decimal? MAX_HEIGHT_1R { get; set; }
    }
}
