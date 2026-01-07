import { DesResponse } from "./api/des-type";
import { recommendations }from "./api/des-type";
interface Props {
    time: number;
    onNext : () => void;
    recommendData : DesResponse | null ;
}
const DestinationModal = ({time, onNext,recommendData} : Props) =>{
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[800px] bg-gray-900 text-white p-8 rounded-2xl">
        
        {/* 도착지 선택 */}
        <span>{time}분 만큼 걸리는 도착지를 추천드립니다</span>
        <h2 className="mb-4 text-2xl">추천 목적지</h2>

      {recommendData?.recommendations.map((r: recommendations) => (
        <div
          key={r.city}
          className="p-3 mb-2 bg-gray-800 rounded-lg"
        >
          {r.city} · {r.estimatedMinutes}분
        </div>
      ))}
    

        {/* 버튼 */}
        <button
          className="w-full py-3 rounded-xl bg-[#7FE067] text-black font-bold hover:opacity-90 transition"
          onClick={onNext}
        >
          좌석 선택하기
        </button>
      </div>
    </div>
  )
}

export default DestinationModal
