import React from "react";
import { SparkAreaChart } from "@tremor/react";

export function CardForMont({
  title = "Lorem, ipsum dolor.",
  subtitle = "Lorem, ipsum dolor.",
  monto = "0.00",
  data,
}) {
  return (
    <div className="border border-slate-200 rounded-lg p-6 dark:border-cyan-200 flex flex-col bg-white dark:bg-slate-800 shadow-md flex-grow min-w-0">
      <h2 className="text-xs font-semibold text-blue-500 mb-1">{title}</h2>
      <div className="flex flex-col gap-1 items-center p-6">
        <SparkAreaChart
          data={data}
          index="date"
          categories={["total_tarjetas"]}
          colors={["teal"]}
          noDataText="Sin datos"
          curveType="linear"
          stack="true"
          connectNulls="true"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">{monto}</h2>
          <span className="text-sm">Venta promedio</span>
        </div>
      </div>
    </div>
  );
}
