import { Session } from "../type/getSessionAllResponse";

interface Props {
  session: Session[];
}

const SessionList = ({ session }: Props) => {
  return (
    <div className="p-5 space-y-5 border-2 border-white">
      {session.map((s) => (
        <div
          key={s.sessionId}
          className="flex justify-between"
        >
          <div className="flex gap-3">
            <div className="text-white">{s.flightName}</div>
            <div className="text-white">
              {s.origin} - {s.destination}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="text-white">
              {s.actualMinutes}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SessionList;
