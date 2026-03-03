"use client";
import { useState, useEffect } from "react";
import { startFocusSound, stopFocusSound } from "@/src/libs/flightSound";

const SoundOnOff = () => {
  const [isOn, setIsOn] = useState(true);

  // 처음 렌더 시 ON 상태면 음악 시작
  useEffect(() => {
    if (isOn) {
      startFocusSound();
    }

    return () => {
      stopFocusSound(); // 컴포넌트 사라질 때 정지
    };
  }, []);

  const handleToggle = () => {
    setIsOn((prev) => {
      const next = !prev;

      if (next) {
        startFocusSound();
      } else {
        stopFocusSound();
      }

      return next;
    });
  };

  return (
    <div className="relative z-50 flex items-center gap-3 mt-15 top-10 left-6">
      <button
        onClick={handleToggle}
        className={`
          flex items-center
          w-16 h-8
          rounded-full
          transition-colors duration-300
          ${isOn ? "bg-green-500" : "bg-gray-300"}
        `}
      >
        <div
          className={`
            w-6 h-6
            bg-white
            rounded-full
            shadow-md
            transform transition-transform duration-300
            ${isOn ? "translate-x-8" : "translate-x-1"}
          `}
        />
      </button>

      <span className="text-sm font-medium text-white">
        {isOn ? "Music ON" : "Music OFF"}
      </span>
    </div>
  );
};

export default SoundOnOff;
