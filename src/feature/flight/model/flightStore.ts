import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { stopSession } from '../api/stop-session';
import { Checklist } from '../type/checklist-type';

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

  setSession: (session: any) => void;
  flightEnd: () => void;
  flightNotEnd: () => void;
  setChecklists: (checklists: Checklist[]) => void;
  flightResume: () => void;
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

      setSession: (session) => set({
        isFlying: true,
        flightName: session.flightName,
        destination: session.destination,
        startedAt: session.startedAt,
        estimatedMinutes: session.estimatedMinutes,
        sessionId: session.sessionId,
      }),

      // ✅ 변경: finally로 묶어서 API 실패해도 무조건 초기화, 중복 set() 제거
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
          });
        }
      },

      // ✅ 변경: finally로 묶어서 API 실패해도 무조건 초기화
      flightEnd: async () => {
        const { sessionId, checklists } = get();
        try {
          if (sessionId) await stopSession(String(sessionId), checklists);
          console.log(sessionId, "종료했습니다");
        } finally {
          set({
            isFlying: false,
            isPaused: false,
            sessionId: null,
            startedAt: null,
            estimatedMinutes: null,
            showFinishedModal: true,
            checklists: [],
          });
        }
      },

      setChecklists: (checklists: Checklist[]) => {
        set({ checklists });
      },

      flightResume: async () => {
        const { sessionId, isPaused } = get();
        if (!sessionId || !isPaused) return;
        set({ isFlying: true, isPaused: false });
      },

      flightPause: async () => {
        const { sessionId, isPaused } = get();
        if (!sessionId || isPaused) return;
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
      }),
    }
  )
);