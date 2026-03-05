import { create, } from 'zustand';
import { persist} from 'zustand/middleware';
import { stopSession } from '../api/stop-session';
import { Checklist } from '../type/checklist-type';
import { resumeSession } from '../api/resume-session';
import { pauseSession } from '../api/pause-session';

interface FlightStore {
  isFlying: boolean;
  isPaused: boolean;
  flightName: string | null;
  destination: string | null;
  startedAt: string | null;
  estimatedMinutes: number | null;
  sessionId: string | null;
  showFinishedModal : boolean;
  checklists : Checklist[];
  
  setSession: (session: any) => void;
  flightEnd: () => void;
  flightNotEnd: () => void;
  setChecklists: (checklists: Checklist[]) => void;
  flightResume: () => void;
  flightPause: () => void;
}

export const useFlightStore = create<FlightStore>()(
  persist( 
    (set,get) => ({
      isFlying: false,
      isPaused: false,
      flightName: null,
      destination: null,
      startedAt: null,
      estimatedMinutes: null,
      sessionId: null,
      showFinishedModal : false,
      checklists : [],
      

      setSession: (session) => set({
        isFlying: true,
        flightName: session.flightName,
        destination: session.destination,
        startedAt: session.startedAt,
        estimatedMinutes: session.estimatedMinutes,
        sessionId: session.sessionId,
      }),

      

      //비행 퍼센트 100% 못 채웠다는 뜻
      flightNotEnd: async () => {
        const { sessionId, checklists} = get();
      
        if (sessionId) {
          await stopSession(String(sessionId),checklists);
          console.log(sessionId, checklists, "종료했습니다");
        }
      
        set({
          isFlying: false,
          sessionId: null,
          startedAt: null,
          estimatedMinutes: null,
          showFinishedModal: false,
          checklists : []
        });
      },


      flightEnd: async () => {
        const { sessionId, checklists } = get();
      
        if (sessionId) {
          await stopSession(String(sessionId),checklists);
          console.log(sessionId, "종료했습니다");
        }
      
        set({
          isFlying: false,
          sessionId: null,
          startedAt: null,
          estimatedMinutes: null,
          showFinishedModal: true,
          checklists : []
        });
      },

      setChecklists: (checklists: Checklist[]) => {
        set({ checklists });
      },

      flightResume: async () => {
        const { sessionId, isPaused } = get();
        if (!sessionId || !isPaused) return; // ← pause 상태일 때만 resume
        await resumeSession(String(sessionId));
        set({
          isFlying: true,
          isPaused: false,
        });
      },
      
      flightPause: async () => {
        const { sessionId, isPaused } = get();
        if (!sessionId || isPaused) return; // ← 이미 pause면 무시
        await pauseSession(String(sessionId));
        set({
          isFlying: true,
          isPaused: true,
        });
      },
      
      
    }),
    {
      name: 'flight-storage', 
    }
  )
);