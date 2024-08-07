import React from "react";
import { ProgresMetric } from "./ProgresMetric";
import { CircleByMetric } from "./CircleByMetric";
import { MetricByLine } from "./MetricByLine";
export function SubMetricCampana({
  title = "Lorem, ipsum.",
  tipo = '',
  value = "00.00",
  val1 = "0",
  val2 = "100",
  meta_day = '0.00',
  meta = '0.00',
  percent = '0.0',
  total = '0.0',
  graph = true,
  restante = '0.0'
}) {
  const formattedValue = tipo === "mount" ? `S./ ${value}` : value;
  const formattedMax = tipo === "mount" ? `S./ ${meta_day}` : meta_day;
  const formatMeta = tipo === "mount" ? `S./ ${meta}` : meta;
  const formatRestante = tipo === "mount" ? `S./ ${restante}` : restante;
  return (
    <div className="border border-slate-200 rounded-lg p-6 dark:border-cyan-200 flex flex-col bg-white dark:bg-slate-800 shadow-md flex-grow min-w-0 cursor-grab">
      <h2 className="text-xs font-semibold text-blue-500 mb-1">{title}</h2>
      <div className="flex justify-center items-center mt-2">
        {graph ?(
          <CircleByMetric percent={val2} value_min={formattedValue} value_max={formattedMax} restante={formatRestante}/>
        ):(
          <MetricByLine metricaInicial={formattedValue} metricaFinal={formatMeta} porcentaje={percent}/>
        )}
      </div>
    </div>
  );
}
