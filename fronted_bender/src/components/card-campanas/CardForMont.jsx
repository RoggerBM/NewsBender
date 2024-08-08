import React from "react";
import { SparkAreaChart } from "@tremor/react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { format } from "date-fns";
const calculateAverage = (data) => {
  if (data.length === 0) return null;
  const sum = data.reduce((acc, value) => acc + value, 0);
  return Math.round(sum / data.length);
};
export function CardForMont({
  title = "Lorem, ipsum dolor.",
  subtitle = "Lorem, ipsum dolor.",
  monto = "0.00",
  data,
  tipo,
}) {
  const thereIs = data.length === 0 ? false : true;
  const sparkLineData = data.map((item) => item.total_tarjetas);
  const xAxisData = thereIs
    ? data.map((item) => {
        const [day, month, year] = item.date.split("/").map(Number);
        return new Date(year + 2000, month - 1, day);
      })
    : [];
  const lastValue =
    sparkLineData.length > 0 ? sparkLineData[sparkLineData.length - 1] : null;
  const averageValue = calculateAverage(sparkLineData);
  const isTrue = tipo === "mount" ? true : false;

  return (
    <div className="border border-slate-200 rounded-lg p-6 dark:border-cyan-200 flex flex-col bg-white dark:bg-slate-800 shadow-md flex-grow min-w-0">
      <h2 className="text-xs font-semibold text-blue-500 mb-1">{title}</h2>
      <div className="flex flex-col gap-1 items-center p-6">
        <div>
          {thereIs && (
            <div className="items-center mb-3">
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Promedio de ventas diarias
              </p>
              <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {isTrue ? `S/.${averageValue}` : averageValue}
              </p>
            </div>
          )}
          {thereIs && (
            <SparkLineChart
              data={sparkLineData}
              xAxis={{
                data: xAxisData,
                valueFormatter: (value) => format(value, "dd/MM/yy"),
              }}
              height={100}
              showTooltip
              showHighlight
              width={200}
            />
          )}
          {!thereIs && (
            <div className="border border-slate-200 rounded-lg p-6 dark:border-cyan-200">
              No hay datos disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
