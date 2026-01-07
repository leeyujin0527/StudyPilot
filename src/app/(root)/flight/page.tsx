"use client";
import Map from '@/src/feature/map/ui/Map';
import FlightButton from '@/src/shared/ui/flightButton';
import { useState } from 'react';
import FlightModal from '@/src/feature/flight/flightModal';

const MapPage = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div>
      <Map/>
      <FlightButton onOpen={() => setIsModal(true)}/>
      {isModal &&
        <FlightModal/>}
    </div>
  )
}

export default  MapPage;