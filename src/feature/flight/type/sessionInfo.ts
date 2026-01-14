export interface sessionInfo{
    sessionId : string;
    flightName : string;
    origin : string;
    destination : string;
    seat : string;
    estimatedMinutes : number;
    actualMinutes : number;
    startedAt : string;
    endedAt : string;
    isCompleted : boolean;
    progressPercentage : number
}