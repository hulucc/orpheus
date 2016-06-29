import { PlanInfo, TimeLine } from './dailyinfo'

export interface PlanInfoTrace extends PlanInfo {
    tact: number;
    isTrial: boolean;
}

export interface TimeLineTrace extends TimeLine {

}