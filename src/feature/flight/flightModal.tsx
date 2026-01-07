import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TimeModal from "./timeModal";
import DestinationModal from "./destinationModal";
import { destination } from "./api/desination";
import { DesResponse } from "./api/des-type";


function FlightModal() {
  const [time, setTime] = useState(30); 
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [recommendData, setRecommendData] = useState<DesResponse | null>(null);

  const handleDes = async() =>{
    const res = await destination({studyMinutes: time, origin:"Seoul"});
    setRecommendData(res);
    setStep(2);
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[800px] bg-gray-900 text-white p-8 rounded-2xl">
        {step === 1 &&(
            <TimeModal
             time={time}
             onChangeTime={setTime} 
             onDesData = {handleDes}/>
        )}
        {step === 2 &&(
            <DestinationModal
             time = {time}
             onNext = {() => router.push("/seat")} 
             recommendData = {recommendData} />
        )
            
        }       
      </div>
    </div>
  );
}

export default FlightModal;
