export interface PlanInfo {
    recid: number;
    dailyID: number;
    kishname: string;
    kibaname: string;
    lot: string;
    koutei: string;
    sLot: string;
    sLotUncomp: number;
    lotComp: number;
    shiftComp: number;
    lotCompAfter: number;
    append: number;
    joc: string;
    cleanCount: string;
    remark: string;
}

export interface TimeLine {
    line: string;
    state: number;
    startTime: moment.Moment;
    endTime: moment.Moment;
    dismension: string;
    dailyID: string;
}

export interface Dict {
    recid: number;
    state: string;
    shift: string;
    shiftGroup: string;
    shiftStartTime: number;
    shiftEndTime: number;
}

export interface DailyInfo {
    recid: number;
    line: string;
    date: moment.Moment;
    operator: string;
    shift: number;
    shiftGroup: number;
    startTime: moment.Moment;
    endTime: moment.Moment;
    confirming: string;
    confirmTime: moment.Moment;

    pspShiftDict: Dict;
    pspShiftGroupDict: Dict;
    pspPlanInfoes: PlanInfo[];
    pspTimeLines: TimeLine[];
}