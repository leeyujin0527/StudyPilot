import { create, } from 'zustand';
import { persist} from 'zustand/middleware';
import { stopSession } from '../api/stop-session';
import { Checklist } from '../type/checklist-type';

interface FlightStore {
  isFlying: boolean;
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
}

export const useFlightStore = create<FlightStore>()(
  persist( 
    (set,get) => ({
      isFlying: false,
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
      
      
    }),
    {
      name: 'flight-storage', 
    }
  )
);