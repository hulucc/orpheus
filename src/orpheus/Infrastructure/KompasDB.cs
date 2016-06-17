namespace orpheus.Infrastructure
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Microsoft.Extensions.Configuration;
    using Infrastructure.Models.Kompas;
    [DbConfigurationType(typeof(OracleDbConfiguration))]
    public partial class KompasDB : DbContext
    {
        public KompasDB(string connStr)
            : base(connStr)
        {
        }

        public virtual DbSet<LINE_INFO> LINE_INFOs { get; set; }
        public virtual DbSet<MST_TACT> MST_TACTs { get; set; }
        public virtual DbSet<SLOTDATA> SLOTDATAs { get; set; }
        public virtual DbSet<SLOTSCHEDULE> SLOTSCHEDULEs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;

            modelBuilder.Entity<LINE_INFO>()
                .Property(e => e.LINE_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<LINE_INFO>()
                .Property(e => e.LINE_NAME)
                .IsUnicode(false);

            modelBuilder.Entity<LINE_INFO>()
                .Property(e => e.FLOOR_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<LINE_INFO>()
                .Property(e => e.ORGANI_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<LINE_INFO>()
                .Property(e => e.AB_FLAG)
                .HasPrecision(38, 0);

            modelBuilder.Entity<LINE_INFO>()
                .Property(e => e.NOTE)
                .IsUnicode(false);
            ////////////////////////////////////////////////////////////
            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.BOARD)
                .IsUnicode(false);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.MODEL)
                .IsUnicode(false);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.PRO_NO)
                .IsUnicode(false);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.PROCESS_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.LINE_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.LINE_ORGANI_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.TACT)
                .HasPrecision(38, 0);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.TACT_FLAG)
                .IsUnicode(false);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.Z_COUNT)
                .HasPrecision(38, 0);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.QTY_CP)
                .HasPrecision(38, 0);

            modelBuilder.Entity<MST_TACT>()
                .Property(e => e.QTY_IK)
                .HasPrecision(38, 0);
            //////////////////////////////////////////////////////
            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.BOARD)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.MODEL)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.PRO_NO)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.LOT)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.SLOT)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.SSLOT)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.PROCESSORG_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.F_KIND)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.LOT_QTY)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.QTY)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.SLOT_START)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.BOTH)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.BOARD_QTY)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.PERMIT)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.SIZE_Y)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.BADMARK)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.SHIPDATE_NOTE)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.BKC)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.SLOT_FIX)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.REV_DATE)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.SUM_BKC)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTDATA>()
                .Property(e => e.SUM_REV)
                .HasPrecision(38, 0);
            ///////////////////////////////////////////////////////////////
            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.SLOT_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.PROCESSORG_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.PROCESS_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.LINE_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.TACT)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.TACT_FLAG)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.TACT_LINE_ID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.RATE)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.Z_COUNT)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.TIME_FUKA)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.TIME_CHG)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.TIME_CHG_EXP)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.TIME_TOTAL)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.SLOT_FIX)
                .HasPrecision(38, 0);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.NOTE_ONE)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.NOTE)
                .IsUnicode(false);

            modelBuilder.Entity<SLOTSCHEDULE>()
                .Property(e => e.NOTE_MODE)
                .HasPrecision(38, 0);
        }
    }
}
