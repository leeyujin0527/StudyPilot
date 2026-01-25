// flightStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FlightStore {
  isFlying: boolean;
  flightName: string | null;
  destination: string | null;
  startedAt: string | null;
  estimatedMinutes: number | null;
  sessionId: string | null;
  
  setSession: (session: any) => void;
  flightEnd: () => void;
}

export const useFlightStore = create<FlightStore>()(
  persist(  // ← persist 추가!
    (set) => ({
      isFlying: false,
      flightName: null,
      destination: null,
      startedAt: null,
      estimatedMinutes: null,
      sessionId: null,
      
      setSession: (session) => set({
        isFlying: true,
        flightName: session.flightName,
        destination: session.destination,
        startedAt: session.startedAt,
        estimatedMinutes: session.estimatedMinutes,
        sessionId: session.sessionId,
      }),
      
      flightEnd: () => set({
        isFlying: false,
        flightName: null,
        destination: null,
        startedAt: null,
        estimatedMinutes: null,
        sessionId: null,
      }),
    }),
    {
      name: 'flight-storage',  // localStorage 키 이름
    }
  )
);