"use client";

import { auth } from "@/src/libs/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFlightStore } from "@/src/feature/flight/model/flightStore";

interface FlightButtonProps {
  onOpen: () => void;
}

const FlightButton = ({ onOpen }: FlightButtonProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isFlying = useFlightStore((state) => state.isFlying);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signup");
    }
  }, [loading, user, router]);

  if (loading || !user) return null;
  if(isFlying){
    return null
  }

  return (
    <div className="fixed z-50 bottom-6 right-6">
      <button
        className="bg-white text-[#209eff] px-4 py-2 rounded-xl shadow-md
                 hover:bg-[#209eff] hover:text-white transition"
        onClick={onOpen}
      >
        ✈️ 비행 시작하기
      </button>
    </div>
  );
};

export default FlightButton;
