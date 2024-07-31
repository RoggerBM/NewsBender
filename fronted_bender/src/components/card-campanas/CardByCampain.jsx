import React from "react";
import { SubMetricCampana } from "./SubMetricCampana";
import { useEffect, useState } from "react";
import { getSubcampanasByCampana } from "../../api/campanas.api";
import { Select, SelectItem } from "@tremor/react";
import { MetricBySubcampana } from "./MetricBySubcampana";
export function CardByCampain({
  campana = "Lorem, ipsum.",
  img = "/vite.svg",
  campanaId,
}) {
  const [subcampanas, setSubcampanas] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    async function loadSubcampanas() {
      const res = await getSubcampanasByCampana(campanaId);
      setSubcampanas(res.data);
      if (res.data.length > 0) {
        setSelectedValue(res.data[0].nombre)
      }else{
        setSelectedValue('Sin subcampana')
      }
    }
    loadSubcampanas();
  }, [campanaId]);
  const itemsList = subcampanas.map((v) => {
    return <SelectItem key={v.id} value={v.nombre} />;
  });
  const subcampanaMetric = subcampanas.map((v) => {
    return <MetricBySubcampana key={v.id} nombre={v.nombre} />;
  });
  return (
    <div className="border border-slate-200	 rounded-lg p-4 dark:border-cyan-200 mb-2">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4 items-center">
          <img src={img} alt="" className="w-8 h-8 rounded-md" />
          <h2 className="text-bold">{campana}</h2>
        </div>
        <div>
          <Select placeholder={selectedValue}>{itemsList}</Select>
        </div>
      </div>
      <div className="grid grid-cols-2  gap-6">
        {subcampanaMetric}

      </div>
    </div>
  );
}
