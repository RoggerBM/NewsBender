import React, { useState, useEffect } from "react";
import { SubMetricCampana } from "./SubMetricCampana";
import { getMetricas } from "../../api/metrics.api";
import { CardForMont } from "./CardForMont";
import { getDayMetrics } from "../../api/periods.api";
const formatDateToYearMonth = (date) => {
  if (!(date instanceof Date)) {
    console.error("Fecha no es un objeto Date:", date);
    return null;
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegurar que el mes tenga dos dígitos
  return `${year}-${month}`;
};
export function MetricBySubcampana({
  nombre = "subcamapana",
  subcampana_id,
  campanaId,
  date_i,
  date_e,
}) {
  const [metricas, setMetricas] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [period, setPeriod] = useState(formatDateToYearMonth(date_e));

  useEffect(() => {
    async function fetchMetricas() {
      const response = await getMetricas(
        nombre,
        campanaId,
        subcampana_id,
        date_i,
        date_e
      );
      setPeriod(formatDateToYearMonth(date_e));
      setMetricas(response.data);
    }
    fetchMetricas();
  }, [nombre, campanaId, subcampana_id, date_i, date_e]);
  useEffect(() => {
    async function fetchChart() {
      const res = await getDayMetrics(nombre, subcampana_id, period);
      setChartData(res.data);
    }
    fetchChart();
  }, [nombre, campanaId, period]);
  return (
    <div className="flex flex-col">
      <h2 className="text-xs font-semibold mb-2">{nombre}</h2>
      <div className="grid grid-cols-3 gap-1">
        {metricas ? (
          <SubMetricCampana
            title={metricas.titulo}
            tipo={metricas.tipo}
            value={metricas.total_tarjetas}
            val1={metricas.val1}
            val2={metricas.val2}
            meta_day={metricas.meta_day}
            graph={true}
            restante={metricas.restante}
          />
        ) : (
          <div>No data available</div>
        )}
        <SubMetricCampana
          title="Meta presupuesto"
          tipo={metricas.tipo}
          value={metricas.total_tarjetas}
          meta_day={metricas.meta_day}
          meta={metricas.meta}
          percent={metricas.percent}
          total={metricas.total}
          graph={false}
        />
        <CardForMont title="Avance de ventas" data={chartData} tipo={metricas.tipo}
        ></CardForMont>
      </div>
    </div>
  );
}
