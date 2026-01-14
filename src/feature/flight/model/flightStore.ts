import { create } from 'zustand';
import { sessionInfo } from '../type/sessionInfo';

interface FlightStore {
  isFlying: boolean;
  flightName: string | null;
  destination: string | null;
  startedAt: string | null;  
  estimatedMinutes: number | null;  // ← 추가!
  sessionId: string | null;
  
  setSession: (session: sessionInfo) => void;
  flightEnd: () => void;
}

export const useFlightStore = create<FlightStore>((set) => ({
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
}));