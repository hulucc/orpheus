using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace orpheus.Core
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Map: Attribute
    {
        public List<string> Items { get; }

        public Map(params string[] items)
        {
            Items = new List<string>(items);
        }
    }

    public class PspStatistic
    {
        /// <summary>
        /// 总时间
        /// </summary>
        [Map(nameof(PspStatisticDetail.TotalTime))]
        public decimal TotalTime { get; set; }
        
        /// <summary>
        /// 无计划
        /// </summary>
        [Map(nameof(PspStatisticDetail.NoPlan))]
        public decimal NoPlan { get; set; }

        /// <summary>
        /// 机种切替
        /// </summary>
        [Map(nameof(PspStatisticDetail.Change), 
            nameof(PspStatisticDetail.VRChange),
            nameof(PspStatisticDetail.ChangeWaiting),
            nameof(PspStatisticDetail.Acceptance),
            nameof(PspStatisticDetail.ReflowTempRise))]
        public decimal ModelChange { get; set; }

        /// <summary>
        /// 点检
        /// </summary>
        [Map(nameof(PspStatisticDetail.Morning),
            nameof(PspStatisticDetail.NozzleMaintainance),
            nameof(PspStatisticDetail.ReflowTempWaiting),
            nameof(PspStatisticDetail.InstrucmentCorrection),
            nameof(PspStatisticDetail.MachineMaintainance))]
        public decimal Inspection { get; set; }

        /// <summary>
        /// 试作
        /// </summary>
        [Map(nameof(PspStatisticDetail.Trial))]
        public decimal Trial { get; set; }

        /// <summary>
        /// 部品交换
        /// </summary>
        [Map()]
        public decimal PartChange { get; set; }

        /// <summary>
        /// 故障
        /// </summary>
        [Map(nameof(PspStatisticDetail.RepairWaiting),
            nameof(PspStatisticDetail.QualityIssue),
            nameof(PspStatisticDetail.CFFault))]
        public decimal Fault { get; set; }

        /// <summary>
        /// 待机
        /// </summary>
        [Map(nameof(PspStatisticDetail.PreStepWaiting),
            nameof(PspStatisticDetail.PartWaiting),
            nameof(PspStatisticDetail.PartSplitWaiting),
            nameof(PspStatisticDetail.VRWaiting),
            nameof(PspStatisticDetail.OperatorWaiting),
            nameof(PspStatisticDetail.BoardWaiting),
            nameof(PspStatisticDetail.Others))]
        public decimal Waiting { get; set; }

        /// <summary>
        /// 有效稼动时间
        /// </summary>
        public decimal EffectiveTime { get; set; }

        /// <summary>
        /// 实绩稼动时间
        /// </summary>
        public decimal ActualTime { get; set; }

        /// <summary>
        /// 理论稼动时间
        /// </summary>
        [Map(nameof(PspStatisticDetail.TheoreticalTime))]
        public decimal TheoreticalTime { get; set; }

        /// <summary>
        /// 生产性
        /// </summary>
        public decimal Productivity { get; set; }

        /// <summary>
        /// 设备稼动率
        /// </summary>
        public decimal MachineActivation { get; set; }

        public PspStatisticDetail Detail { get; set; } = new PspStatisticDetail ();

        public PspStatisticTrace Trace { get; set; } = new PspStatisticTrace();

    }

    public class PspStatisticDetail
    {
        /// <summary>
        /// 总时间
        /// </summary>
        public decimal TotalTime { get; set; }

        /// <summary>
        /// 理论稼动时间
        /// </summary>
        public decimal TheoreticalTime { get; set; }

        /// <summary>
        /// 无计划
        /// </summary>
        [Map("S")]
        public decimal NoPlan { get; set; }

        /// <summary>
        /// 切替
        /// </summary>
        [Map("Q")]
        public decimal Change { get; set; }

        /// <summary>
        /// VR切替
        /// </summary>
        [Map("T")]
        public decimal VRChange { get; set; }

        /// <summary>
        /// 切替等待
        /// </summary>
        [Map("C")]
        public decimal ChangeWaiting { get; set; }

        /// <summary>
        /// 合格判定数
        /// </summary>
        [Map("E")]
        public decimal Acceptance { get; set; }

        /// <summary>
        /// 炉温上升
        /// </summary>
        [Map("X")]
        public decimal ReflowTempRise { get; set; }

        /// <summary>
        /// 清扫、早礼
        /// </summary>
        [Map("A", "B")]
        public decimal Morning { get; set; }

        /// <summary>
        /// 喷嘴保养
        /// </summary>
        [Map("W")]
        public decimal NozzleMaintainance { get; set; }

        /// <summary>
        /// 炉温等待
        /// </summary>
        [Map("O")]
        public decimal ReflowTempWaiting { get; set; }

        /// <summary>
        /// 检查仪修正
        /// </summary>
        [Map()]
        public decimal InstrucmentCorrection { get; set; }

        /// <summary>
        /// 制造保养
        /// </summary>
        [Map()]
        public decimal MachineMaintainance { get; set; }

        /// <summary>
        /// 试作
        /// </summary>
        [Map("P")]
        public decimal Trial { get; set; }

        /// <summary>
        /// 修理等待
        /// </summary>
        [Map("N")]
        public decimal RepairWaiting { get; set; }

        /// <summary>
        /// 品质故障
        /// </summary>
        [Map("Z")]
        public decimal QualityIssue { get; set; }

        /// <summary>
        /// 前工程等待
        /// </summary>
        [Map("G")]
        public decimal PreStepWaiting { get; set; }

        /// <summary>
        /// 部品等待
        /// </summary>
        [Map("L")]
        public decimal PartWaiting { get; set; }

        /// <summary>
        /// 部品分割等待
        /// </summary>
        [Map("D")]
        public decimal PartSplitWaiting { get; set; }

        /// <summary>
        /// VR等待
        /// </summary>
        [Map("K")]
        public decimal VRWaiting { get; set; }

        /// <summary>
        /// 操作员等待
        /// </summary>
        [Map("H")]
        public decimal OperatorWaiting { get; set; }

        /// <summary>
        /// CF异常
        /// </summary>
        [Map("U")]
        public decimal CFFault { get; set; }

        /// <summary>
        /// 基板等待
        /// </summary>
        [Map("M")]
        public decimal BoardWaiting { get; set; }

        /// <summary>
        /// 其它
        /// </summary>
        [Map("F", "I", "J", "V", "Y")]
        public decimal Others { get; set; }

        public PspStatisticTrace Trace { get; set; } = new PspStatisticTrace();
    }

    public class PspStatisticTrace
    {
        /// <summary>
        /// field - timeline_recid_list or planinfo_recid_list
        /// </summary>
        public Dictionary<string, object> TraceInfoes { get; set; } = 
            new Dictionary<string, object>();

        public List<string> Errors { get; set; } = new List<string>();
    }
}
