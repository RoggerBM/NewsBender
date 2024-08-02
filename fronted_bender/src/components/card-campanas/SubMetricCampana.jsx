import React from "react";
import { ProgresMetric } from "./ProgresMetric";
import { CircleByMetric } from "./CircleByMetric";
export function SubMetricCampana({
  title = "Lorem, ipsum.",
  value = "00.00",
  val1 = "0",
  val2 = "100",
  meta_day = '0.00',
  meta = '0.00',
  percent = '0.0',
  graph = true
}) {
  const labelText =
    title === "mount"
      ? "Monto Desembolsado"
      : title === "count"
      ? "Tarjetas Formalizadas"
      : title;
 
  const formattedValue = title === "mount" ? `S./ ${value}` : value;
  const formattedMax = title === "mount" ? `S./ ${meta_day}` : meta_day;

  return (
    <div className="border border-slate-200 rounded-lg p-6 dark:border-cyan-200 flex flex-col bg-white dark:bg-slate-800 shadow-md flex-grow min-w-0 cursor-grab">
      <h2 className="text-xs font-semibold text-blue-500 mb-1">{labelText}</h2>
      <div className="flex item-center justify-center mt-5">
        {graph ?(
          <CircleByMetric percent={val2} value_min={formattedValue} value_max={formattedMax}/>
        ):(
          <ProgresMetric metricaInicial={formattedValue} metricaFinal={meta} porcentaje={percent}/>
        )}
      
      </div>
    </div>
  );
}
