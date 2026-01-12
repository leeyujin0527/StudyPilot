"use client";
import SeatForm from "@/src/feature/seat/ui/seatForm";
import { sessionStart } from "@/src/feature/seat/api/session-start";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    router.push(`/flight?sessionId=${res.sessionId}&destination=${destination}`)
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
