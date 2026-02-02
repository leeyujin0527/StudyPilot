import { create, } from 'zustand';
import { persist} from 'zustand/middleware';
import { stopSession } from '../api/patch-session';

interface FlightStore {
  isFlying: boolean;
  flightName: string | null;
  destination: string | null;
  startedAt: string | null;
  estimatedMinutes: number | null;
  sessionId: string | null;
  showFinishedModal : boolean;
  
  setSession: (session: any) => void;
  flightEnd: () => void;
  flightNotEnd: () => void;
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
      
      setSession: (session) => set({
        isFlying: true,
        flightName: session.flightName,
        destination: session.destination,
        startedAt: session.startedAt,
        estimatedMinutes: session.estimatedMinutes,
        sessionId: session.sessionId,
      }),

          
      flightNotEnd: async () => {
        const { sessionId } = get();
      
        if (sessionId) {
          await stopSession(String(sessionId));
          console.log(sessionId, "종료했습니다");
        }
      
        set({
          isFlying: false,
          sessionId: null,
          startedAt: null,
          estimatedMinutes: null,
          showFinishedModal: false,
        });
      },


      flightEnd: async () => {
        const { sessionId } = get();
      
        if (sessionId) {
          await stopSession(String(sessionId));
          console.log(sessionId, "종료했습니다");
        }
      
        set({
          isFlying: false,
          sessionId: null,
          startedAt: null,
          estimatedMinutes: null,
          showFinishedModal: true,
        });
      },
      
      
    }),
    {
      name: 'flight-storage', 
    }
  )
);