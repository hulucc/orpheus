namespace orpheus.Infrastructure
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Microsoft.Extensions.Configuration;
    using Infrastructure.Models.Grid;
    [DbConfigurationType(typeof(OracleDbConfiguration))]
    public partial class GridDB : DbContext
    {
        public GridDB(string connStr)
            : base(connStr)
        {
        }

        public virtual DbSet<CAMMASTER> CAMMASTERs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.MODEL)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.BOARD)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B_ID)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.LOT)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRONUM)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PCBFILENAME)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.CAMFILENAME)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PCBPARTSNO)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.THICKNESS)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.SIZE_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.SIZE_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.BD_NUM_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.BD_NUM_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.BD_PITCH_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.BD_PITCH_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.STD_POS1_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.STD_POS1_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.STD_POS2_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.STD_POS2_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.LSTD_POS1_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.LSTD_POS1_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.LSTD_POS2_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.LSTD_POS2_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.STD_MOVE_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.STD_MOVE_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.LND_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.LND_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A1_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A1_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A2_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A2_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A3_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A3_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A4_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A4_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B1_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B1_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B2_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B2_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B3_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B3_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B4_POS_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.B4_POS_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.A_FORM)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.CAMNOTE)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRODUCT_FLAG)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.GAP)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.ORG_SIDE)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.OPPM)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.UB_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARK1_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARK1_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARK2_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARK2_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARK3_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARK3_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARKB1_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARKB1_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARKB2_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARKB2_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARKB3_X)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PRNMARKB3_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RECOG_ID_A1)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RECOG_ID_A2)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RECOG_ID_A3)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RECOG_ID_A4)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RECOG_ID_B1)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RECOG_ID_B2)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RECOG_ID_B3)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RECOG_ID_B4)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.CAM_FLAG)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.RD)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.NO_HOLE)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.OPECODE)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.F_RECOG)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.PLATE)
                .HasPrecision(38, 0);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.WORD)
                .IsUnicode(false);

            modelBuilder.Entity<CAMMASTER>()
                .Property(e => e.MAX_HEIGHT_1R)
                .HasPrecision(6, 3);
        }
    }
}
