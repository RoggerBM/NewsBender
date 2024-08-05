import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubcampanaById } from "../../api/subcampanas.api";
import { MetricBySubcampana } from "../card-campanas/MetricBySubcampana";
import { startOfDay, endOfDay } from "date-fns";
import { DateRangePicker } from "@tremor/react";
import { BarCharCampana } from "./BarCharCampana";
import { LineCharCampana } from "./LineCharCampana";
export function CampanaView() {
  const { id } = useParams();

  const [subcampana, setSubcampana] = useState(id);
  const today = new Date();
  const [dateValue, setDateValue] = useState({
    from: startOfDay(today),
    to: endOfDay(today),
  });
  useEffect(() => {
    async function loadSubcampana() {
      const res = await getSubcampanaById(id);
      setSubcampana(res.data);
    }
    loadSubcampana();
  }, [id]);
  const handleValueChange = (value) => {
    setDateValue(value);
    console.log("Selected Date Range:", value);
  };
  return (
    <div>
      <div className="flex flex-col mb-5">
        <DateRangePicker
          value={dateValue}
          onValueChange={handleValueChange}
          className="mx-auto max-w-md"
        />
        <MetricBySubcampana
          key={subcampana.id}
          nombre={subcampana.nombre}
          subcampana_id={subcampana.id}
          campana_id={subcampana.id}
          date_i = {dateValue.from}
          date_e = {dateValue.to}
        />
      </div>
      <div className="mb-5">
      <BarCharCampana subcampanaId={subcampana.id}
          nombre={subcampana.nombre}></BarCharCampana>
      </div>
      <div>
        <LineCharCampana campana={subcampana.nombre} id={subcampana.id}/>
      </div>
    </div>
  );
}
