"use client";
import FlightButton from "@/src/shared/ui/flightButton";
import { useState, useEffect, Suspense } from "react";
import FlightModal from "@/src/feature/flight/ui/flightModal";
import FlightDashboard from "@/src/feature/flight/ui/flightDashboard";
import { useFlightStore } from "@/src/feature/flight/model/flightStore";
import { useSearchParams } from "next/navigation";
import { getSession } from "@/src/feature/flight/api/session-get";
import FinisedModal from "@/src/feature/flight/ui/finisedModal";
import CheckLIstModal from "@/src/feature/flight/ui/checkLIstModal";
import SoundOnOff from "@/src/feature/flight/ui/soundOnOff";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/src/feature/map/ui/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

const FlightContent = () => {
  const [isModal, setIsModal] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { showFinishedModal } = useFlightStore();

  useEffect(() => {
    useFlightStore.setState({ showFinishedModal: false });
  }, []);

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
      <Map />
      <FlightButton onOpen={() => setIsModal(true)} />
      <div className="fixed z-50 flex flex-col top-8 left-3">
        <CheckLIstModal />
        <SoundOnOff />
      </div>
      {isModal && <FlightModal />}
      <FlightDashboard />
      {showFinishedModal && <FinisedModal />}
    </div>
  );
};

const MapPage = () => {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black" />}>
      <FlightContent />
    </Suspense>
  );
};

export default MapPage; 