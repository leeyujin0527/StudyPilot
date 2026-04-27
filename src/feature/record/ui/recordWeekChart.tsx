"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useWeekly } from "../model/useWeekly";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const recordWeekChart = () => {
  const {data : weekly, isLoading : weeklyLoaing} = useWeekly();


  if (weeklyLoaing) {
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
    <div className="w-full mt-5 space-y-6">

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

export default recordWeekChart;
