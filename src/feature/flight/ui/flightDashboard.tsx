import { useFlightStore } from "../model/flightStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { stopFocusSound } from "@/src/libs/flightSound";
import { usePause } from "../model/usePause";
import { useResume } from "../model/useResume";


function FlightDashboard() {
  const {
    isFlying,
    isPaused,
    flightName,
    destination,
    startedAt,
    estimatedMinutes,
    sessionId,
    flightEnd,
    flightNotEnd,
    flightPause,
    flightResume
  } = useFlightStore();

  const router = useRouter();
  const { mutate : pauseMutate} = usePause();
  const { mutate : resumeMutate} = useResume();

  const handleEnd = async () => {
    flightEnd();
    stopFocusSound();
  };
  const handleNotEnd = async () => {
    flightNotEnd();
    stopFocusSound();
    router.push("/record");
  };
  const handlePause = () => {
    pauseMutate(String(sessionId), {
      onSuccess: () => {
        flightPause();
      }
    });
  };
  const handleResume = async () => {
    resumeMutate(String(sessionId), {
      onSuccess: () => {
        flightResume();
      }
    });
  };

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (progress >= 100) {
      handleEnd();
    }
  }, [progress]);

  useEffect(() => {
    // pause 중이거나 비행 중 아닐 때 interval 안 돌림
    if (!startedAt || !estimatedMinutes || !isFlying || isPaused) return;

    const calculateProgress = () => {
      const start = new Date(startedAt);
      const now = new Date();
      const elapsedMinutes = (Number(now) - Number(start)) / (1000 * 60);
      const calculated = Math.min(
        Math.round((elapsedMinutes / estimatedMinutes) * 100),
        100
      );
      setProgress(calculated);
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 1000);
    return () => clearInterval(interval);
  }, [startedAt, estimatedMinutes, isFlying, isPaused]);

  if (!isFlying && !isPaused) return null;

  return (
    <div className="fixed w-full max-w-5xl px-4 -translate-x-1/2 bottom-6 left-1/2">
      <div className="rounded-full shadow-2xl bg-slate-800">
        <div className="flex items-center gap-6 px-8 py-4">
          {/* 제목 */}
          <div className="flex items-center max-w-md min-w-0 gap-4 shrink-0">
            <div className="min-w-0 text-left">
              <div className="text-sm font-medium tracking-wide text-blue-400">
                {isPaused ? "일시정지" : "비행 중"}
              </div>
              <div className="text-xl font-bold text-white truncate">
                {flightName}
              </div>
            </div>
            <div className="w-px h-12 shrink-0 bg-slate-600"></div>
          </div>

          {/* 프로그레스 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="text-left">
                <div className="text-lg font-semibold text-white">목적지:</div>
                <div className="text-xl font-bold text-white">{destination}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold text-white">{progress}%</div>
                <div className="text-sm text-slate-400">Complete</div>
              </div>
            </div>
            <div className="relative w-full h-2 overflow-hidden rounded-full bg-slate-700">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-300 bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="w-px h-12 shrink-0 bg-slate-600"></div>

          {/* 버튼 */}
          <div className="flex flex-row gap-3 shrink-0">
            <button
              onClick={isPaused ? handleResume : handlePause}
              className="flex items-center gap-3 px-5 py-3 transition-colors border-2 rounded-full bg-red-950/50 border-red-500/50 hover:bg-red-900/50"
            >
              <div className="flex items-center justify-center w-6 h-6 bg-orange-400 rounded-sm">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-lg font-bold text-orange-400 whitespace-nowrap">
                {isPaused ? "계속" : "정지"}
              </span>
            </button>
            <button
              onClick={handleNotEnd}
              className="flex items-center gap-3 px-8 py-3 transition-colors border-2 rounded-full bg-red-950/50 border-red-500/50 hover:bg-red-900/50"
            >
              <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-sm">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-lg font-bold text-red-500 whitespace-nowrap">
                비행중단
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightDashboard;