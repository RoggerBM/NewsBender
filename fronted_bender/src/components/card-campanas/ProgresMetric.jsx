import React from "react";
import { ProgressBar } from "@tremor/react";

export function ProgresMetric({metricaInicial=0.0,metricaFinal=0.0,porcentaje=0.0}) {
  return (
    <div>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between gap-2">
        <span>S/. {metricaInicial} &bull; {porcentaje}%</span>
        <span>S/. {metricaFinal}</span>
      </p>
      <ProgressBar value={porcentaje} color="teal" className="mt-3" />
    </div>
  );
}
