import { DesResponse, recommendations } from "../type/des-type";
import { useState } from "react";

interface Props {
  time: number;
  onNext: () => void;
  recommendData: DesResponse | null;
  onSelect: (city: string) => void;
}

const DestinationModal = ({ time, onNext, recommendData, onSelect }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const handleNext = () =>{
    if (!selected){
        alert("목적지를 선택해주세요");
        return;
    }
    onSelect(selected);
    onNext();
  }

  return (
    <div>
      <span>{time}분 만큼 걸리는 도착지를 추천드립니다</span>
      <h2 className="mb-4 text-2xl">추천 목적지</h2>

      <div className="space-y-3">
        {recommendData?.recommendations.map((r: recommendations) => {
          const isSelected = selected === r.city;

          return (
            <div
              key={r.city}
              onClick={() => setSelected(r.city)}
              className={`
                flex items-center justify-between
                p-4 rounded-xl cursor-pointer transition
                border
                ${
                  isSelected
                    ? "bg-[#7FE067]/20 border-[#7FE067]"
                    : "bg-gray-800 border-gray-700 hover:border-[#7FE067] hover:bg-gray-700"
                }
              `}
            >
              {/* 왼쪽 */}
              <div>
                <p className="text-sm text-gray-400">{r.country}</p>
                <p className="text-lg font-semibold">{r.city}</p>
              </div>

              {/* 오른쪽 */}
              <div className="text-right">
                <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-[#7FE067] text-black">
                  {r.estimatedMinutes}분
                </span>
                <p className="mt-1 text-xs text-gray-400">
                  차이 {r.difference}분
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="w-full py-3 mt-3 rounded-xl bg-[#7FE067] text-black font-bold hover:opacity-90 transition"
        onClick={handleNext}
      >
        좌석 선택하기
      </button>
    </div>
  );
};

export default DestinationModal;
