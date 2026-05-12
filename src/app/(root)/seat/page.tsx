"use client";
import SeatForm from "@/src/feature/seat/ui/seatForm";
import { sessionStart } from "@/src/feature/seat/api/session-start";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useFlightStore } from "@/src/feature/flight/model/flightStore";
import { getSession } from "@/src/feature/flight/api/session-get";
import { startFocusSound } from "@/src/libs/flightSound";

const SeatContent = () => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const origin = "Seoul";
  const [seat, setSeat] = useState<string>("");
  const flightName = searchParams.get("flightName");
  const router = useRouter();

  if (!destination || !flightName) {
    return null;
  }

  const handleStart = async () => {
    const res = await sessionStart({ flightName, origin, destination, seat });
    const session = await getSession(res.sessionId);
    useFlightStore.getState().setSession(session);
    startFocusSound();
    router.push(`/flight?sessionId=${res.sessionId}`);
  };

  return (
    <div>
      <SeatForm
        onStart={handleStart}
        onSeatSelect={setSeat}
        flightName={flightName}
      />
    </div>
  );
};

const SeatPage = () => {
  return (
    <Suspense fallback={null}>
      <SeatContent />
    </Suspense>
  );
};

export default SeatPage;