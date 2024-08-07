import React, { useState, useEffect } from "react";
import { SubMetricCampana } from "./SubMetricCampana";
import { getMetricas } from "../../api/metrics.api";
export function MetricBySubcampana({
  nombre = "subcamapana",
  subcampana_id,
  campanaId,
  date_i,
  date_e,
}) {
  const [metricas, setMetricas] = useState([]);

  useEffect(() => {
    async function fetchMetricas() {
      const response = await getMetricas(
        nombre,
        campanaId,
        subcampana_id,
        date_i,
        date_e
      );
      setMetricas(response.data);
    }
    fetchMetricas();
  }, [nombre, campanaId, subcampana_id, date_i, date_e]);

  return (
    <div className="flex flex-col">
      <h2 className="text-xs font-semibold mb-2">{nombre}</h2>
      <div className="flex gap-4">
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
          percent = {metricas.percent}
          total={metricas.total}
          graph={false}
        />
      </div>
      
    </div>
  );
}
