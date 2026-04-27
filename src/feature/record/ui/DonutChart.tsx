"use client";

import { useMemo } from "react";
import { useGetAllSession } from "../model/useGetAllSession";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const DonutChart = () => {
  const { data } = useGetAllSession();
  const sessions = data?.sessions ?? [];

  const { chartData, labels, focusTimes } = useMemo(() => {
    const ended = sessions.filter(
      (s) => s.status === "ENDED" && s.estimatedMinutes > 0
    );

    const slots: Record<string, typeof ended> = {
      "오전 (06-12시)": [],
      "오후 (12-18시)": [],
      "저녁 (18-24시)": [],
    };

    ended.forEach((s) => {
      const hour = new Date(s.startedAt).getHours();
      if (hour >= 6 && hour < 12) slots["오전 (06-12시)"].push(s);
      else if (hour >= 12 && hour < 18) slots["오후 (12-18시)"].push(s);
      else slots["저녁 (18-24시)"].push(s);
    });

    // 집중 지속시간 = (actualMinutes - totalPauseMinutes) / (pauseCount + 1)
    const allFocusTimes: Record<string, number> = {};
    Object.entries(slots).forEach(([label, list]) => {
      if (list.length === 0) { allFocusTimes[label] = 0; return; }
      const avg = list.reduce((sum, s) => {
        const pure = s.actualMinutes - s.totalPauseMinutes;
        return sum + pure / (s.pauseCount + 1);
      }, 0) / list.length;
      allFocusTimes[label] = Math.round(avg);
    });

    const validEntries = Object.entries(allFocusTimes).filter(([_, val]) => val > 0);
    const labels = validEntries.map(([label]) => label);
    const chartData = validEntries.map(([_, val]) => val);
    const focusTimes = Object.fromEntries(validEntries);

    return { chartData, labels, focusTimes };
  }, [sessions]);

  const bestSlot = Object.entries(focusTimes).reduce(
    (best, [label, val]) => (val > best.val ? { label, val } : best),
    { label: "", val: -1 }
  );

  const options: ApexCharts.ApexOptions = {
    chart: { type: "donut", background: "transparent" },
    labels,
    title: {
      text: "시간대별 집중력 분석",
      align: "center",
      style: { fontSize: "14px", fontWeight: "bold", color: "#ffffff" },
    },
    colors: ["#0066FF", "#7AFFBF", "#00D1FF"],
    dataLabels: {
      enabled: true,
      formatter: (_, opts) => `${focusTimes[labels[opts.seriesIndex]]}분`,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: { color: "#ffffff" },
            value: { color: "#ffffff" },
            total: {
              show: true,
              label: "최고 집중",
              color: "#ffffff",
              formatter: () => `${bestSlot.val}분`,
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      labels: { colors: "#ffffff" },
    },
    tooltip: {
      y: {
        formatter: (_, opts) =>
          `평균 ${focusTimes[labels[opts.seriesIndex]]}분 집중`,
      },
    },
    stroke: { width: 0 },
  };

  if (chartData.length === 0) {
    return (
      <div className="w-full p-6 bg-white/20 backdrop-blur rounded-2xl">
        <ReactApexChart
          options={{
            chart: { type: "donut", background: "transparent" },
            colors: ["#374151"],
            tooltip: { enabled: false },
            dataLabels: { enabled: false },
            legend: { show: false },
            stroke: { width: 0 },
            plotOptions: {
              pie: {
                donut: {
                  size: "85%",
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      label: "데이터 없음",
                      formatter: () => "-",
                    },
                  },
                },
              },
            },
          }}
          series={[1]}
          type="donut"
          height={330}
        />
      </div>
    );
  }

  return (
    <div className="h-full bg-white/20 backdrop-blur rounded-2xl">
      <ReactApexChart
        key={JSON.stringify(chartData)}
        options={options}
        series={chartData}
        type="donut"
        height={340}
      />
    </div>
  );
};

export default DonutChart;
