"use client";
import SeatForm from "@/src/feature/seat/ui/seatForm";
import { sessionStart } from "@/src/feature/seat/api/session-start";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlightStore } from "@/src/feature/flight/model/flightStore";
import { getSession } from "@/src/feature/flight/api/session-get";

const seatPage = () => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const origin = "Seoul";
  const [seat, setSeat] = useState<string>("");
  const flightName = searchParams.get("flightName");
  if (!destination || !flightName) {
    return null;
  }
  const router = useRouter()
  const handleStart = async () => {
    const res = await sessionStart({ flightName, origin, destination, seat });
    const session = await getSession(res.sessionId)
    useFlightStore.getState().setSession(session)
    router.push(`/flight?sessionId=${res.sessionId}`)
    console.log(`Session started with flightName: ${flightName}, origin: ${origin}, destination: ${destination}, seat: ${seat}`);
    console.log(res)
  };
  return (
    <div>
      <SeatForm
        onStart={handleStart}
        onSeatSelect ={setSeat}
        flightName={flightName}
      />
    </div>
  );
};

export default seatPage;
