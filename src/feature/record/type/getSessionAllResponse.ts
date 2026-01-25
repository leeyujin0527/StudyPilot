export interface Session {
    sessionId: string;
    flightName: string;
    origin: string;
    destination: string;
    seat: string;
    estimatedMinutes: number;
    actualMinutes: number;
    startedAt: string;   
    endedAt: string;     
    isCompleted: boolean;
    progressPercentage: number;
  }
export interface GetSessionAllResponse {
    totalCount: number;
    completedCount: number;
    abandonedCount: number;
    inProgressCount: number;
    sessions: Session[];
  }
    