import React, { useEffect, useState } from "react";
import { BarChart } from "@tremor/react";
import { getPeriodos } from "../../api/metrics.api";
import { SliderView } from "./SliderView";

const dataFormatter = (number) =>
  `S/.${Intl.NumberFormat("us").format(number).toString()}`;

export function BarCharCampana({ subcampanaId, nombre,date_i,date_e,tipo }) {
  const [chartdata, setChartdata] = useState([]);
  const isTrue = tipo === 'mount' ? true : false;

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const response = await getPeriodos(nombre, subcampanaId);
        const periodosData = response.data.map((item) => ({
          name: item.periodo,
          "Total Tarjetas": item.total_tarjetas,
        }));
        setChartdata(periodosData);
      } catch (error) {
        console.error("Error fetching periodos data:", error);
      }
    };

    fetchPeriodos();
  }, [nombre, subcampanaId]);

  return (
    <div className="border border-slate-200	 rounded-lg p-4 bg-white dark:bg-slate-800">
      <h2 className="text-xs font-semibold text-blue-500 mb-1">
        Análisis de Ventas
      </h2>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="name"
        categories={["Total Tarjetas"]}
        colors={["emerald"]}
        valueFormatter={isTrue ? dataFormatter : undefined}        
        yAxisWidth={48}
      />
    </div>
  );
}
