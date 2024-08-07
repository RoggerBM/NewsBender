import React, { useEffect, useState } from "react";
import { LineChart } from "@tremor/react";
import { SelectByPeriodo } from "./SelectByPeriodo";
import { getDayMetrics } from "../../api/periods.api";


const dataFormatter = (number) =>
  `S/.${Intl.NumberFormat("us").format(number).toString()}`;

export function LineCharCampana({ campana,id,tipo }) {
  const [chartData, setChartData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  console.log("tipo",tipo);
  const isTrue = tipo === 'mount' ? true : false;
  useEffect(() => {
    async function fetchMetrics() {
      if (campana && selectedPeriod) {
        const res = await getDayMetrics(campana, id, selectedPeriod);
        const transformedData = res.data.map(item => ({
          date: item.date,
          'Valor del día': item.total_tarjetas
        }));
        
        setChartData(transformedData);
      }
    }
    fetchMetrics();
  }, [campana, selectedPeriod]);
  return (
    <div className="border border-slate-200	 rounded-lg p-4 bg-white dark:bg-slate-800">
      <h2 className="text-xs font-semibold text-blue-500 mb-1">
        Evolución de ventas por dias
      </h2>
      <SelectByPeriodo name={campana} onPeriodChange={setSelectedPeriod} />
      <div className="">
      <LineChart
        className="h-80"
        data={chartData}
        index="date"
        categories={["Valor del día"]}
        colors={["cyan"]}
        valueFormatter={isTrue ? dataFormatter : undefined}
        onValueChange={(v) => console.log(v)}
      />
      </div>
    </div>
  );
}
