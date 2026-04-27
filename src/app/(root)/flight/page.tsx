"use client";
import Map from "@/src/feature/map/ui/Map";
import FlightButton from "@/src/shared/ui/flightButton";
import { useState } from "react";
import FlightModal from "@/src/feature/flight/ui/flightModal";
import FlightDashboard from "@/src/feature/flight/ui/flightDashboard";
import { useFlightStore } from "@/src/feature/flight/model/flightStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getSession } from "@/src/feature/flight/api/session-get";
import FinisedModal from "@/src/feature/flight/ui/finisedModal";
import CheckLIstModal from "@/src/feature/flight/ui/checkLIstModal";
import SoundOnOff from "@/src/feature/flight/ui/soundOnOff";

const MapPage = () => {
  useEffect(() => {
    useFlightStore.setState({ showFinishedModal: false }); // ← 이거
  }, []);
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

export default MapPage;
