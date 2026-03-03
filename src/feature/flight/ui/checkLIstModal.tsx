import { useState, useEffect } from "react";
import { useFlightStore } from "../model/flightStore";
interface Props {
  content: string;
  isCompleted: boolean;
}
const CheckLIstModal = () => {
  const [list, setList] = useState<Props[]>([
    { content: "", isCompleted: false },
  ]);
  const handlePlus = () => {
    setList((prev) => [...prev, { content: "", isCompleted: false }]);
  };
  const handleRemove = (index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const setChecklists = useFlightStore((state) => state.setChecklists)
  useEffect(() => {
    setChecklists(list);
  }, [list, setChecklists]);
  return (
    <div className="relative z-50 top-20 left-6">
      <label className="flex flex-col items-center gap-2 px-3 py-2 rounded shadow bg-white/30">
        <div className="text-2xl font-bold text-white">체크리스트</div>
        {list.map((m, index) => (
          <div className="flex gap-2" key={index}>
            <input
              type="checkbox"
              className="accent-blue-500"
              checked={m.isCompleted}
              onChange={() =>
                setList((prev) =>
                  prev.map((v, i) =>
                    i === index ? { ...v, isCompleted: !v.isCompleted } : v
                  )
                )
              }
            />
            <input
              type="text"
              value={m.content}
              placeholder="할 일을 적어보세요"
              className="w-40 bg-transparent border-b border-gray-400 text-md focus:border-gray-500 focus:outline-none sm:w-48 md:w-64 lg:w-96"
              onChange={(e) =>
                setList((prev) =>
                  prev.map((v, i) =>
                    i === index ? { ...v, content: e.target.value } : v
                  )
                )
              }
            />
            <button
              className="p-2 text-sm text-white bg-slate-500 round"
              onClick={() => handleRemove(index)}
            >
              삭제
            </button>
          </div>
        ))}

        <button
          onClick={handlePlus}
          className="w-40 p-2 text-white rounded bg-slate-700 text-md focus:outline-none sm:w-48 md:w-64 lg:w-96"
        >
          + 추가
        </button>
      </label>
    </div>
  );
};

export default CheckLIstModal;
