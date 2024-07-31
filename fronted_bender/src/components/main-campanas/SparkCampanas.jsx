import React from "react";
import { SparkAreaChart } from "@tremor/react";
const chartdata = [
  {
    month: "Jan 21",
    Performance: 4000,
  },
  {
    month: "Feb 21",
    Performance: 3000,
  },
  {
    month: "Mar 21",
    Performance: 2000,
  },
  {
    month: "Apr 21",
    Performance: 2780,
  },
  {
    month: "May 21",
    Performance: 1890,
  },
  {
    month: "Jun 21",
    Performance: 2390,
  },
  {
    month: "Jul 21",
    Performance: 3490,
  },
];

export function SparkCampanas({campana='Lorem, ipsum dolor.',subcamapana='Ipsum dolor.',}) {
  return (
    <div className="border border-slate-200	 rounded-lg p-4 dark:border-cyan-200 flex gap-2">
      <div className="flex items-center space-x-2.5">
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          {campana}
        </p>
        <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {subcamapana}
        </span>
      </div>
      <SparkAreaChart
        data={chartdata}
        categories={['Performance']}
        index={'month'}
        colors={['emerald']}
        className="h-8 w-20 sm:h-10 sm:w-36"
      />
      <div className="flex items-center space-x-2.5">
        <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">179.26</span>
        <span className="rounded bg-emerald-500 px-2 py-1 text-tremor-default font-medium text-white">
          +1.72%
        </span>
      </div>
    </div>
  );
}
