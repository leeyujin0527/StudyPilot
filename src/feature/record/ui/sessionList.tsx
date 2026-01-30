import { Session } from "../type/getSessionAllResponse";

interface Props {
  session: Session[];
}

const SessionList = ({ session }: Props) => {
  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  
  return (
    <div className="grid justify-center grid-cols-1 gap-20 mt-5 md:grid-cols-2 xl:grid-cols-3">
      {session.map((s) => (
        <div
        key={s.sessionId}
        className="flex flex-col max-w-2xl gap-6 px-6 py-5 border shadow-lg  bg-white backdrop-blur-md border-white/30 rounded-2xl hover:rotate-[-1deg] transition-transform"
      >
        {/* 상단 */}
        <div className="flex items-center justify-between">
          <span className="text-3xl font-black text-[#7FE067]">
            {s.flightName}
          </span>
          <div className="text-lg">
            study time · {s.actualMinutes} min
          </div>
        </div>
      
        {/* 출발 / 도착 */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold ">{s.origin}</div>
            <div className="text-sm ">{formatTime(s.startedAt)}</div>
          </div>
      
          <div className="text-right">
            <div className="text-3xl font-bold ">{s.destination}</div>
            <div className="text-sm ">{formatTime(s.endedAt)}</div>
          </div>
        </div>
      
        {/* ✈ 비행 라인 */}
        <div className="flex flex-col items-center gap-1 mt-2">
          <div className="flex items-center w-full gap-4">
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            <div className="relative flex-1">
              <div className="border-t border-dashed " />
              <span className="absolute px-2 -translate-x-1/2 rounded-full left-1/2 -top-3 bg-white/40">
                ✈
              </span>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full" />
          </div>
          <span className="text-xs tracking-widest">
            NONSTOP
          </span>
        </div>
      </div>
      
      ))}
    </div>
  );
};

export default SessionList;
