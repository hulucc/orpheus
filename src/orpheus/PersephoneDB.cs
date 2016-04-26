namespace orpheus
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using orpheus.Models;
    using Microsoft.Extensions.Configuration;
    using System.Data.Entity.Infrastructure.Interception;
    using System.Data.Common;

    public partial class PersephoneDB : DbContext
    {
        public PersephoneDB(IConfiguration config)
            : base(config["Data:CMS:ConnectionString"])
        {
        }

        public virtual DbSet<PspDailyInfo> PspDailyInfoes { get; set; }
        public virtual DbSet<PspDict> PspDicts { get; set; }
        public virtual DbSet<PspPlanInfo> PspPlanInfoes { get; set; }
        public virtual DbSet<PspTimeLine> PspTimeLines { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.Recid)
                .HasPrecision(38, 0);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.Line)
                .IsUnicode(false);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.Date)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.Operator)
                .IsUnicode(false);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.Shift)
                .HasPrecision(38, 0);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.ShiftGroup)
                .HasPrecision(38, 0);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.StartTime)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.EndTime)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.Confirming)
                .IsUnicode(false);

            modelBuilder.Entity<PspDailyInfo>()
                .Property(e => e.ConfirmTime)
                .IsFixedLength()
                .IsUnicode(false);
            modelBuilder.Entity<PspDailyInfo>()
                .HasMany(e => e.PspPlanInfoes)
                .WithRequired(e => e.PspDailyInfo)
                .HasForeignKey(e => e.DailyID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PspDailyInfo>()
                .HasMany(e => e.PspTimeLines)
                .WithOptional(e => e.PspDailyInfo)
                .HasForeignKey(e => e.DailyID);

            modelBuilder.Entity<PspDict>()
                .Property(e => e.Recid)
                .HasPrecision(38, 0);

            modelBuilder.Entity<PspDict>()
                .Property(e => e.ShiftStartTime)
                .HasPrecision(20, 0);

            modelBuilder.Entity<PspDict>()
                .Property(e => e.ShiftEndTime)
                .HasPrecision(20, 0);
            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.Recid)
                .HasPrecision(38, 0);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.DailyID)
                .HasPrecision(38, 0);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.Kishname)
                .IsUnicode(false);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.Kibaname)
                .IsUnicode(false);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.Lot)
                .IsUnicode(false);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.Koutei)
                .IsUnicode(false);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.SLot)
                .IsUnicode(false);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.SLotUncomp)
                .HasPrecision(20, 0);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.LotComp)
                .HasPrecision(20, 0);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.ShiftComp)
                .HasPrecision(20, 0);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.LotCompAfter)
                .HasPrecision(20, 0);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.Joc)
                .IsUnicode(false);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.Part)
                .IsUnicode(false);

            modelBuilder.Entity<PspPlanInfo>()
                .Property(e => e.CleanCount)
                .IsUnicode(false);

            modelBuilder.Entity<PspTimeLine>()
                .Property(e => e.Line)
                .IsUnicode(false);

            modelBuilder.Entity<PspTimeLine>()
                .Property(e => e.State)
                .HasPrecision(38, 0);

            modelBuilder.Entity<PspTimeLine>()
                .Property(e => e.StartTime)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<PspTimeLine>()
                .Property(e => e.EndTime)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<PspTimeLine>()
                .Property(e => e.DailyID)
                .HasPrecision(38, 0);
        }
    }
}
