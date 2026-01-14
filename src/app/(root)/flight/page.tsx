"use client";
import Map from '@/src/feature/map/ui/Map';
import FlightButton from '@/src/shared/ui/flightButton';
import { useState } from 'react';
import FlightModal from '@/src/feature/flight/ui/flightModal';
import FlightDashboard from '@/src/feature/flight/ui/flightDashboard';
import { useFlightStore } from '@/src/feature/flight/model/flightStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getSession } from '@/src/feature/flight/api/session-get';

const MapPage = () => {
  const [isModal, setIsModal] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    if (!sessionId) return;
  
    const restoreSession = async () => {
      const session = await getSession(sessionId);
  
      useFlightStore.getState().setSession(session);
    };
  
    restoreSession();
  }, [sessionId]);

  return (
    <div>
      <Map/>
      <FlightButton onOpen={() => setIsModal(true)}/>
      {isModal &&
        <FlightModal/>}
      <FlightDashboard/>
    </div>
  )
}

export default  MapPage;