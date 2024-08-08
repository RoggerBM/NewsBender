import React from "react";
import { ProgressCircle, Badge, BadgeDelta } from "@tremor/react";
import { RiArrowUpCircleLine, RiArrowDownCircleLine } from "@remixicon/react";
import { Legend } from "@tremor/react";

export function CircleByMetric({
  percent = 200,
  value_min = "0.0",
  value_max = "100.0",
  restante = "0.0",
}) {
  const isNegative = parseFloat(percent) < 0 ? true : false;
  const vl = parseFloat(value_min) < 0 ? true : false;
  const resNegative = parseFloat(restante) < 0;
  const adjustedRestante = resNegative ? restante * -1 : restante;

  return (
    <div className="flex flex-col gap-1">
      <ProgressCircle
        value={percent}
        size="md"
        color={isNegative ? "rose" : "lime"}
      >
        <span className="text-xs font-medium text-slate-700 dark:text-white">
          {percent}%
        </span>
      </ProgressCircle>
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="flex text-xs font-semibold gap-1">
          <BadgeDelta
            deltaType={isNegative ? "decrease" : "increase"}
            isIncreasePositive={true}
          >
            {value_min}
          </BadgeDelta>
          <Badge color={resNegative ? "lime" : "amber"}>
            {adjustedRestante}
          </Badge>

          <Badge>{value_max}</Badge>
        </div>
        <div className="mt-1 text-xs p-4">
          <Legend
            categories={
              resNegative
                ? ["Valor acumulado", "Excedente", "Meta del día"]
                : ["Valor acumulado", "Restante", "Meta del día"]
            }
            colors={
              isNegative
                ? resNegative
                  ? ["rose", "lime", "blue"]
                  : ["rose", "amber", "blue"]
                : resNegative
                ? ["emerald", "lime", "blue"]
                : ["emerald", "amber", "blue"]
            }
          />
        </div>
      </div>
    </div>
  );
}
