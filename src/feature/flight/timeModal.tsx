import { DesResponse } from "./api/des-type";

interface Props {
    time : number;
    onChangeTime : (time : number) => void;
    onDesData : () => void;
}

const TimeModal = ({time, onChangeTime, onDesData} : Props) =>{
  return (
    <div>
        {/* 비행명 */}
        <div className="mb-8">
          <span className="block mb-3 text-2xl font-semibold">
            이 비행에서 도착하고 싶은 공부를 적어주세요
          </span>
          <textarea
            className="w-full h-20 p-3 bg-gray-800 rounded-lg outline-none resize-none"
            placeholder="예: 영어 단어 100개 외우기"
          />
        </div>

        {/* 비행 시간 */}
        <div className="mb-10">
          <span className="block mb-4 text-2xl font-semibold">
            집중이 끊기지 않을 만큼의 시간을 골라주세요
          </span>

          <div className="flex items-center justify-between mb-2 text-gray-400">
            <span>30분</span>
            <span>300분</span>
          </div>

          <input
            type="range"
            min={30}
            max={300}
            step={30}
            value={time}
            onChange={(e) => onChangeTime(Number(e.target.value))}
            className="w-full accent-[#7FE067]"
          />

          <div className="mt-4 text-center text-xl font-bold text-[#7FE067]">
            ✈️ {time}분 비행
          </div>
        </div>
        {/* 버튼 */}
        <button
          className="w-full py-3 rounded-xl bg-[#7FE067] text-black font-bold hover:opacity-90 transition"
          onClick={onDesData}
        >
          다음 페이지
        </button>
      
    </div>
  )
}

export default TimeModal
