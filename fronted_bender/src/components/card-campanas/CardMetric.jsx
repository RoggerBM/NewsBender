import React from "react";
import { Badge } from "@tremor/react";

export function CardMetric({
  title = "Revenue",
  value = "50846.90",
  percent = "6.8",
}) {
  return (
    <div className="flex flex-col gap-4">
      <Badge color="green">
        <span
          className={`font-medium ml-2 text-sm ${
            parseFloat(percent) >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {parseFloat(percent) >= 0 ? `+${percent}%` : `${percent}%`}
        </span>
      </Badge>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">S/.{value}</h1>
      <h2 className="text-slate-400	font-sans">{title}</h2>
    </div>
  );
}
