import React from "react";
import { ProgressCircle } from "@tremor/react";
import { RiArrowUpCircleLine, RiArrowDownCircleLine } from "@remixicon/react";
export function CircleByMetric({
  percent = 200,
  value_min = "0.0",
  value_max = "100.0",
}) {
  const isNegative = parseFloat(percent) < 0 ? true : false;

  return (
    <div>
      <div className="flex justify-start space-x-5 items-center">
        <ProgressCircle
          value={percent}
          size="md"
          color={isNegative ? "rose" : "lime"}
        >
          <span className="text-xs font-medium text-slate-700 dark:text-white">
            {percent}%
          </span>
        </ProgressCircle>
        <div>
          <div className="flex gap-2 justify-center">
            {isNegative ? (
              <RiArrowDownCircleLine color="red" />
            ) : (
              <RiArrowUpCircleLine color="lime" />
            )}
            <p className="font-medium text-sm flex items-center gap-1">
              {value_min} / {value_max} ({percent}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
