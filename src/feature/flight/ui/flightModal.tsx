import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TimeModal from "./timeModal";
import DestinationModal from "./destinationModal";
import { destination } from "../api/desination";
import { DesResponse } from "../type/des-type";
import { useFlightStore } from "../model/flightStore";

function FlightModal() {
  const [time, setTime] = useState(30);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [recommendData, setRecommendData] = useState<DesResponse | null>(null);
  const [selectedDes, setSelectedDes] = useState<string>("");
  const [flightName, setFlightName] = useState<string>("");

  const handleDes = async () => {
    const res = await destination({ studyMinutes: time, origin: "Seoul" });
    console.log()
    setRecommendData(res);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[800px] bg-gray-900 text-white p-8 rounded-2xl">
        {step === 1 && (
          <TimeModal
            time={time}
            onChangeTime={setTime}
            onDesData={handleDes}
            onNext={() => setStep(2)}
            onSetFlightName={setFlightName}
          />
        )}
        {step === 2 && (
          <DestinationModal
            time={time}
            onNext={() => {
              if (!selectedDes) return;
              router.push( `/seat?destination=${selectedDes}&flightName=${flightName}`);
            }}
            recommendData={recommendData}
            onSelect={setSelectedDes}
            flightName = {flightName}
          />
        )}
      </div>
    </div>
  );
}

export default FlightModal;
