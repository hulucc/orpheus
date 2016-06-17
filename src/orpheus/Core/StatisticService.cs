using orpheus.Core.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace orpheus.Core
{
    public class StatisticException : Exception
    {
        public StatisticException()
            : base()
        { }
        public StatisticException(string message)
            :base(message)
        { }
        public StatisticException(string message, Exception inner)
            :base(message, inner)
        { }
    }

    public class StatisticService
    {
        private const decimal TOTALTIME = 8 * 60 - 45; 
        private PspStatistic m_model = new PspStatistic();
        private PspDailyInfo m_daily;
        private readonly ITact m_tack;
        private readonly IBoard m_board;
        private Dictionary<string, string> m_detailMap = new Dictionary<string, string>();
        private Dictionary<string, List<string>> m_modelMap = new Dictionary<string, List<string>>();

        public PspStatistic Result
        {
            get
            {
                return m_model;
            }
        }
        public List<StatisticException> Errors { get; private set; } = new List<StatisticException>();

        public StatisticService(
            ITact tack,
            IBoard board)
        {
            m_tack = tack;
            m_board = board;
            InitializeDetailMap();
            InitializeModelMap();
        }
        //helper
        private void AddTrace(PspStatisticTrace trace, string propertyName, decimal recid)
        {
            var traceInfoes = trace.TraceInfoes;
            if (traceInfoes.ContainsKey(propertyName))
            {
                var refer = traceInfoes[propertyName] as List<decimal>;
                refer.Add(recid);
            }
            else
            {
                var refer = new List<decimal> { recid };
                traceInfoes.Add(propertyName, refer);
            }
        }
        private void AddTrace(PspStatisticTrace trace, string propertyName, IEnumerable<decimal> list)
        {
            if (list == null)
                return;
            var traceInfoes = trace.TraceInfoes;
            if (traceInfoes.ContainsKey(propertyName))
            {
                var refer = traceInfoes[propertyName] as List<decimal>;
                refer.AddRange(list);
            }
            else
            {
                var refer = new List<decimal>(list);
                traceInfoes.Add(propertyName, refer);
            }
        }
        private List<decimal> GetTrace(PspStatisticTrace trace, string propertyName)
        {
            var traceInfoes = trace.TraceInfoes;
            if (traceInfoes.ContainsKey(propertyName))
                return traceInfoes[propertyName] as List<decimal>;
            else
                return null;
        }
        enum AnnotationType
        {
            None,
            Classification,
            Others,
        }
        private AnnotationType GetAnnotationType(PspTimeLine tl)
        {
            if (string.IsNullOrWhiteSpace(tl.Dismension))
                return AnnotationType.None;
            else if (Regex.IsMatch(tl.Dismension, @"^[A-Z]+\s.*$"))
                return AnnotationType.Classification;
            else
                return AnnotationType.Others;
        }
        private string GetAnnotationValue(PspTimeLine tl)
        {
            return tl.Dismension[0].ToString();
        }
        private decimal GetTimeSpanMins(PspTimeLine tl)
        {
            var start = System.Convert.ToDateTime(tl.StartTime);
            var end = System.Convert.ToDateTime(tl.EndTime);
            return System.Convert.ToDecimal((end - start).TotalMinutes);
        }
        private bool IsTrial(PspPlanInfo plan)
        {
            try
            {
                return m_board.IsTrial(plan.Kishname, plan.Kibaname);
            }
            catch(Exception ex)
            {
                var msg = string.Format("planinfo: {0} check trial fail", plan.Recid);
                throw new StatisticException(msg, ex);
            }
        }
        private decimal GetTact(PspPlanInfo plan)
        {
            try
            {
                return m_tack.GetByPlan(plan.Kishname, plan.Kibaname, plan.Lot, plan.SLot, plan.Koutei);
            }
            catch (Exception ex)
            {
                var msg = string.Format("planinfo: {0} get tact fail", plan.Recid);
                throw new StatisticException(msg, ex);
            }
        }
        
        //handlers
        private void InitializeDetailMap()
        {
            var ps = typeof(PspStatisticDetail).GetProperties();
            foreach (var p in ps)
            {
                var map = p.GetCustomAttributes(typeof(Map), false).FirstOrDefault() as Map;
                if(map != null)
                {
                    foreach (var item in map.Items)
                    {
                        m_detailMap.Add(item, p.Name);
                    }
                }
            }
        }
        private void AppendDetail()
        {
            var detail = m_model.Detail;
            detail.TotalTime += TOTALTIME;
            AddTrace(detail.Trace, nameof(detail.TotalTime), m_daily.Recid);
            AppendDetail_AppendTheoreticalTime();
            foreach (var tl in m_daily.PspTimeLines)
            {
                var state = tl.State;
                var type = GetAnnotationType(tl);
                string classification = string.Empty;
                if (type == AnnotationType.Classification)
                    classification = GetAnnotationValue(tl);
                var propertyName = AppendDetail_Map(classification);
                if (state == 1)//运行
                {
                    if (propertyName == nameof(detail.Trial))
                        AppendDetail_Classify(nameof(detail.Trial), tl);
                }
                else if (state == 2)//故障
                    AppendDetail_Classify(nameof(detail.RepairWaiting), tl);
                else if (state == 3)//切替
                    AppendDetail_Classify(nameof(detail.Change), tl);
                else if (state == 4)//停线
                {
                    if (type == AnnotationType.None || type == AnnotationType.Others)
                        AppendDetail_Classify(nameof(detail.Others), tl);
                    else if (type == AnnotationType.Classification)
                    {
                        if (!string.IsNullOrEmpty(propertyName))
                            AppendDetail_Classify(propertyName, tl);
                    }
                    else
                        throw new NotImplementedException();
                }
                else
                    throw new NotSupportedException();
            }
        }
        private void AppendDetail_Classify(string propertyName, PspTimeLine tl)
        {
            var detail = m_model.Detail;
            var mins = GetTimeSpanMins(tl);
            var p = detail.GetType().GetProperty(propertyName);
            var value = (decimal)p.GetValue(detail);
            p.SetValue(detail, value + mins);
            AddTrace(detail.Trace, propertyName, tl.Recid);
        }
        private string AppendDetail_Map(string classification)
        {
            var propertyName = string.Empty;
            m_detailMap.TryGetValue(classification, out propertyName);
            return propertyName;
        }
        private void AppendDetail_AppendTheoreticalTime()
        {
            var detail = m_model.Detail;
            foreach (var plan in m_daily.PspPlanInfoes)
            {
                if (!IsTrial(plan))
                {
                    detail.TheoreticalTime += plan.ShiftComp * GetTact(plan) / 60;
                    AddTrace(detail.Trace, nameof(detail.TheoreticalTime), plan.Recid);
                }
            }
        }

        private void InitializeModelMap()
        {
            var ps = typeof(PspStatistic).GetProperties();
            foreach (var p in ps)
            {
                var map = p.GetCustomAttributes(typeof(Map), false).FirstOrDefault() as Map;
                if(map != null)
                    m_modelMap.Add(p.Name, map.Items);
            }
        }
        private void CalcModel()
        {
            foreach (var propertyName in m_modelMap)
                foreach (var detailPropertyName in propertyName.Value)
                    CalcModel_Classify(propertyName.Key, detailPropertyName);
            m_model.EffectiveTime = m_model.TotalTime - m_model.NoPlan;
            m_model.ActualTime = m_model.EffectiveTime - m_model.ModelChange - m_model.Inspection - m_model.Trial;
            m_model.Productivity = m_model.TheoreticalTime / m_model.ActualTime;
            m_model.MachineActivation = m_model.EffectiveTime / m_model.TotalTime;
        }
        private void CalcModel_Classify(string propertyName, string detailPropertyName)
        {
            var detail = m_model.Detail;
            var detailProperty = detail.GetType().GetProperty(detailPropertyName);
            var detailValue = (decimal)detailProperty.GetValue(detail);
            var detailTraceData = GetTrace(detail.Trace, detailPropertyName);
            var property = m_model.GetType().GetProperty(propertyName);
            var value = (decimal)property.GetValue(m_model);
            property.SetValue(m_model, value + detailValue);
            AddTrace(m_model.Trace, propertyName, detailTraceData);
        }
        //api
        public void Reset()
        {
            m_model = new PspStatistic();
            Errors = new List<StatisticException>();
        }
        public void Append(PspDailyInfo daily)
        {
            m_daily = daily;
            try
            {
                AppendDetail();
            }
            catch (StatisticException ex)
            {
                Errors.Add(ex);
            }
        }
        public void Calc()
        {
            CalcModel();
        }
        public void SetErrors()
        {
            if(Errors.Count > 0)
            {
                m_model.Trace.Errors.AddRange(Errors.Select(e => e.Message));
            }
        }
        public PspStatistic Summarize(PspDailyInfo daily)
        {
            Reset();
            Append(daily);
            Calc();
            SetErrors();
            return Result;
        }
        public PspStatistic Summarize(IEnumerable<PspDailyInfo> dailys)
        {
            Reset();
            if (dailys.Count() == 0)
                return Result;
            foreach (var daily in dailys)
                Append(daily);
            Calc();
            SetErrors();
            return Result;
        }
    }
}
