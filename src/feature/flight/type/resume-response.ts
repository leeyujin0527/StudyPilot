export type SessionStatus = "RUNNING" | "PAUSED" | "ENDED";

export interface ResumeResponse {
    sessionId: string;
    status: Extract<SessionStatus, "RUNNING">;
    resumedAt: string;
    accumulatedMinutes: number;
}