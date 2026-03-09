import { Session } from "../type/getSessionAllResponse";
import { useState } from "react";
import ChecklistModal from "./ChecklistModal";

interface Props {
  session: Session[];
  date: string;
}

const SessionList = ({ session, date }: Props) => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  const filteredSession = session.filter((s) => {
    const sessionDate = new Date(s.startedAt).toDateString();
    const selected = new Date(date).toDateString();
    return sessionDate === selected;
  });

  return (
    <>
      <div className="grid justify-center grid-cols-1 gap-20 mt-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredSession.map((s) => (
          <div
            key={s.sessionId}
            onClick={() => setSelectedSessionId(s.sessionId)}
            className="flex flex-col max-w-2xl gap-6 px-6 py-5 border shadow-lg cursor-pointer bg-white/90 rounded-2xl hover:rotate-[-1deg] transition-transform"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#7FE067]">
                {s.flightName}
              </span>
              <div className="text-lg">study time · {s.actualMinutes} min</div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{s.origin}</div>
                <div className="text-sm">{formatTime(s.startedAt)}</div>
              </div>

              <div className="text-right">
                <div className="text-3xl font-bold">{s.destination}</div>
                <div className="text-sm">{formatTime(s.endedAt)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSessionId && (
        <ChecklistModal
          sessionId={selectedSessionId}
          onClose={() => setSelectedSessionId(null)}
        />
      )}
    </>
  );
};

export default SessionList;
