"use client";

const FlightButton = () => {
  return (
    <div className="absolute bottom-6 right-6">
      <button className="bg-white text-[#209eff] px-4 py-2 rounded-xl shadow-md hover:bg-[#209eff] hover:text-white transition">
        ✈️ 비행 시작하기
      </button>
    </div>
  );
};

export default FlightButton;