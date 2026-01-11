"use client";
import SeatForm from "@/src/feature/seat/ui/seatForm";
import { sessionStart } from "@/src/feature/seat/api/session-start";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const seatPage = () => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const origin = "Seoul";
  const [seat, setSeat] = useState<string>("");
  const flightName = searchParams.get("flightName");
  if (!destination || !flightName) {
    return null;
  }
  const handleStart = async () => {
    await sessionStart({ flightName, origin, destination, seat });
    console.log(`Session started with flightName: ${flightName}, origin: ${origin}, destination: ${destination}, seat: ${seat}`);
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
