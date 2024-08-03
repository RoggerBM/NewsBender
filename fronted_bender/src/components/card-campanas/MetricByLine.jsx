import React from "react";
import { ProgressBar, CategoryBar, Legend } from "@tremor/react";

export function MetricByLine({
  metricaInicial = 0.0,
  metricaFinal = 0.0,
  porcentaje = 0.0,
}) {
  const porcentajeInteger = Math.round(porcentaje); // Puedes usar Math.floor o Math.ceil si prefieres
  const restantePercentage = 100 - porcentaje;

  return (
    <div className="w-full">
      <div className="flex justify-center items-center">
        <p className="text-lg font-semibold">{porcentaje}%</p>
      </div>
      <div className="flex flex-col mt-5">
        <div>
          <CategoryBar
            values={[porcentaje, restantePercentage]}
            colors={["emerald", "rose"]}
            markerValue={porcentajeInteger}
          />
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between gap-2 mt-2">
            <span>{metricaInicial}</span>
            <span>{metricaFinal}</span>
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Legend
            className="mt-3"
            categories={["Avance", "Restante"]}
            colors={["emerald", "red"]}
          />
        </div>
      </div>
    </div>
  );
}
