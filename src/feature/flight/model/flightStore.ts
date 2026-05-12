import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { stopSession } from '../api/stop-session';
import { Checklist } from '../type/checklist-type';

interface ResumeResult {
  accumulatedMinutes: number;
  resumedAt: string;
}

interface FlightStore {
  isFlying: boolean;
  isPaused: boolean;
  flightName: string | null;
  destination: string | null;
  startedAt: string | null;
  estimatedMinutes: number | null;
  sessionId: string | null;
  showFinishedModal: boolean;
  checklists: Checklist[];
  accumulatedMinutes: number;

  setSession: (session: any) => void;
  flightEnd: () => void;
  flightNotEnd: () => void;
  setChecklists: (checklists: Checklist[]) => void;
  flightResume: (res: ResumeResult) => void; // API 결과 받음
  flightPause: () => void;
}

export const useFlightStore = create<FlightStore>()(
  persist(
    (set, get) => ({
      isFlying: false,
      isPaused: false,
      flightName: null,
      destination: null,
      startedAt: null,
      estimatedMinutes: null,
      sessionId: null,
      showFinishedModal: false,
      checklists: [],
      accumulatedMinutes: 0,

      setSession: (session) => set({
        isFlying: true,
        flightName: session.flightName,
        destination: session.destination,
        startedAt: session.startedAt,
        estimatedMinutes: session.estimatedMinutes,
        sessionId: session.sessionId,
        accumulatedMinutes: 0,
      }),

      flightNotEnd: async () => {
        const { sessionId, checklists } = get();
        try {
          if (sessionId) await stopSession(String(sessionId), checklists);
        } finally {
          set({
            isFlying: false,
            isPaused: false,
            sessionId: null,
            startedAt: null,
            estimatedMinutes: null,
            showFinishedModal: false,
            checklists: [],
            accumulatedMinutes: 0,
          });
        }
      },

      flightEnd: async () => {
        const { sessionId, checklists } = get();
        try {
          if (sessionId) await stopSession(String(sessionId), checklists);
        } finally {
          set({
            isFlying: false,
            isPaused: false,
            sessionId: null,
            startedAt: null,
            estimatedMinutes: null,
            showFinishedModal: true,
            checklists: [],
            accumulatedMinutes: 0,
          });
        }
      },

      setChecklists: (checklists: Checklist[]) => set({ checklists }),

      // store에서 API 호출 제거, 결과만 받아서 저장
      flightResume: (res: ResumeResult) => {
        set({
          isFlying: true,
          isPaused: false,
          accumulatedMinutes: res.accumulatedMinutes,
          startedAt: res.resumedAt,
        });
      },

      flightPause: () => {
        set({ isFlying: true, isPaused: true });
      },
    }),
    {
      name: 'flight-storage',
      partialize: (state) => ({
        isFlying: state.isFlying,
        isPaused: state.isPaused,
        flightName: state.flightName,
        destination: state.destination,
        startedAt: state.startedAt,
        estimatedMinutes: state.estimatedMinutes,
        sessionId: state.sessionId,
        checklists: state.checklists,
        accumulatedMinutes: state.accumulatedMinutes,
      }),
    }
  )
);