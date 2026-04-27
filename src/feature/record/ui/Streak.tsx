import { useStreak } from "../model/useStreak";
import { useWeekly } from "../model/useWeekly";

function Streak() {
    const {data : streak, isLoading : streakLoading} = useStreak();
    const {data : weekly, isLoading : weeklyLoading} = useWeekly();
    if (streakLoading || weeklyLoading) {
        return <div>Loading...</div>;
      }
      if (!weekly) {
        return null;
      }
    
  return (
    <div className="flex items-center justify-between p-6 mt-4 bg-white/20 backdrop-blur rounded-2xl">
    <div>
      <div className="text-sm text-white/70">이번 주 총 공부 시간</div>
      <div className="text-4xl font-bold text-white">
        {Math.floor(weekly.totalMinutes / 60)}h {weekly.totalMinutes % 60}m
      </div>
    </div>

    <div className="text-[24px] font-semibold text-blue-300">
      ✈ {streak?.currentStreak}일 연속 비행중입니다!
    </div>
  </div>
  )
}

export default Streak
