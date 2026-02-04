import { useEffect, useState } from "react";
import { getSessionChecklist } from "../api/get-sessionChecklist";
import { Checklist } from "../type/getChecklistResponse";

interface Props {
  sessionId: string;
  onClose: () => void;
}

const ChecklistModal = ({ sessionId, onClose }: Props) => {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessionChecklist(sessionId)
      .then(setChecklists)
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="p-4 bg-white w-96 rounded-xl">
        <h2 className="mb-3 text-xl font-bold">체크리스트</h2>

        {loading ? (
          <div>로딩중...</div>
        ) : (
          <ul className="space-y-2">
            {checklists.map((c, i) => (
              <li key={i} className="flex gap-2">
                <input type="checkbox" checked={c.isCompleted} readOnly />
                <span>{c.content}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="w-full p-2 mt-4 text-white rounded bg-slate-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ChecklistModal;
