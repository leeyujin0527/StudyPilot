export type SessionStatus = "RUNNING" | "PAUSED" | "ENDED";

export interface PauseResponse {
    sessionId: string;
    status: Extract<SessionStatus, "PAUSED">;
    pausedAt: string;
    accumulatedMinutes: number;
}