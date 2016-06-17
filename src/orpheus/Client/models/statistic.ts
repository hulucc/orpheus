import moment from 'moment';

export type StatisticMode = 
    "MonthByDay" |
    "MonthByWeek" |
    "YearByMonth";

export interface StatisticTrace {
    traceInfoes: { [key: string]: number[]; }
    errors: string[];
}

export interface StatisticDetail {
    totalTime: number;
    theoreticalTime: number;
    noPlan: number;
    change: number;
    vrChange: number;
    changeWaiting: number;
    acceptance: number;
    reflowTempRise: number;
    morning: number;
    nozzleMaintainance: number;
    reflowTempWaiting: number;
    instrucmentCorrection: number;
    machineMaintainance: number;
    trial: number;
    repairWaiting: number;
    qualityIssue: number;
    preStepWaiting: number;
    partWaiting: number;
    partSplitWaiting: number;
    vrWaiting: number;
    operatorWaiting: number;
    cfFault: number;
    boardWaiting: number;
    others: number;

    trace: StatisticTrace;
}

export interface Statistic {
    totalTime: number;
    noPlan: number;
    modelChange: number;
    inspection: number;
    trial: number;
    partChange: number;
    fault: number;
    waiting: number;
    effectiveTime: number;
    actualTime: number;
    theoreticalTime: number;
    productivity: number;
    machineActivation: number;
    
    detail: StatisticDetail;
    trace: StatisticTrace;
}