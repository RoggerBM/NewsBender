import React from "react";
import { SubMetricCampana } from "./SubMetricCampana";
export function MetricBySubcampana({ nombre = "subcamapana" }) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xs font-semibold mb-2">{nombre}</h2>
      <div className="flex gap-4">
        <SubMetricCampana></SubMetricCampana>
        <SubMetricCampana></SubMetricCampana>
        <SubMetricCampana></SubMetricCampana>

      </div>
    </div>
  );
}
