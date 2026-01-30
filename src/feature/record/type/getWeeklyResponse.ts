export interface WeeklySummaryResponse{
    totalMinutes : number
    days : DailyStudy[]
}
export interface DailyStudy{
    date : string,
    totalMinutes : number
}