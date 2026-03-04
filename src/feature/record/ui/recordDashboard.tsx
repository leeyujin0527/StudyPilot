"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { getSessionWeekly } from "../api/get-weekly";
import { getSessionCurrent } from "../api/get-currentStreak";
import { WeeklySummaryResponse } from "../type/getWeeklyResponse";
import { auth } from "@/src/libs/firebase";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RecordDashboard = () => {
  const [weekly, setWeekly] = useState<WeeklySummaryResponse | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 현재 사용자 확인
        const user = auth.currentUser;
        if (!user) {
          console.log("❌ Dashboard - 로그인 안 됨");
          return;
        }

        console.log("📊 Dashboard - Fetching data for:", user.email);

        // 토큰 확인
        const token = await user.getIdToken();
        console.log(
          "✅ Dashboard - Token exists:",
          token.substring(0, 20) + "..."
        );

        // 데이터 가져오기
        console.log("📡 Fetching weekly data...");
        const weeklyRes = await getSessionWeekly();
        console.log("✅ Weekly data:", weeklyRes);

        console.log("📡 Fetching streak data...");
        const streakRes = await getSessionCurrent();
        console.log("✅ Streak data:", streakRes);

        setWeekly(weeklyRes);
        setStreak(streakRes.currentStreak);
      } catch (e) {
        console.error("❌ dashboard fetch fail", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="mt-5 mb-40">
        <div className="p-6 text-center text-white bg-white/20 backdrop-blur rounded-2xl">
          대시보드 로딩 중...
        </div>
      </div>
    );
  }

  if (!weekly) {
    return (
      <div className="mt-5 mb-40">
        <div className="p-6 text-center text-white bg-white/20 backdrop-blur rounded-2xl">
          데이터를 불러올 수 없습니다.
        </div>
      </div>
    );
  }
  
  const chartSeries = [
    {
      name: "Study Time (minutes)",
      data: weekly.days.map((d) => d.totalMinutes),
    },
  ];
  const chartOptions : ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: weekly.days.map((d) => d.date.slice(5)),
    },
    yaxis: {
      title: {
        text: "Minutes",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
  if (!weekly) return null;

  return (
    <div className="mt-5 mb-40 space-y-6">
      {/* 요약 */}
      <div className="flex items-center justify-between p-6 bg-white/20 backdrop-blur rounded-2xl">
        <div>
          <div className="text-sm text-white/70">이번 주 총 공부 시간</div>
          <div className="text-4xl font-bold text-white">
            {Math.floor(weekly.totalMinutes / 60)}h {weekly.totalMinutes % 60}m
          </div>
        </div>

        <div className="text-[24px] font-semibold text-blue-300">
          ✈ {streak}일 연속 비행중입니다!
        </div>
      </div>

      {/* 막대 그래프 */}
      <div className="p-6 bg-white/20 backdrop-blur rounded-2xl">
        {/* 막대 그래프 */}
        <div className="p-6 bg-white/20 backdrop-blur rounded-2xl">
          <div className="mb-4 font-semibold text-white">
            최근 7일 공부 기록
          </div>

          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default RecordDashboard;
