import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@tremor/react";
import { getPeriods } from "../../api/periods.api";

export function SelectByPeriodo({ name,onPeriodChange  }) {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const response = await getPeriods(name);
        setPeriods(response.data);
        const initialPeriod = response.data[0] || "";
        setSelectedPeriod(initialPeriod);
        onPeriodChange(initialPeriod); // Pasar el período inicial al componente padre
      } catch (error) {
        console.error("Error fetching periods:", error);
      }
    };

    fetchPeriods();
  }, [name, onPeriodChange]);

  console.log(selectedPeriod);
  return (
    <div className="mx-auto max-w-xs flex gap-2 items-center mb-1">
      <div className="text-center font-mono text-sm text-slate-500">
        Periodo
      </div>
      <Select
        value={selectedPeriod}
        onValueChange={(value) => {
          setSelectedPeriod(value);
          onPeriodChange(value);
        }}
      >
        {periods.map((period) => (
          <SelectItem key={period} value={period}>
            {period}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
