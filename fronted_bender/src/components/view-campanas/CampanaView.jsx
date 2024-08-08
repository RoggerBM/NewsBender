import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubcampanaById } from "../../api/subcampanas.api";
import { MetricBySubcampana } from "../card-campanas/MetricBySubcampana";
import { parse, endOfDay, startOfMonth } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { DateRangePicker } from "@tremor/react";
import { BarCharCampana } from "./BarCharCampana";
import { LineCharCampana } from "./LineCharCampana";
import { SliderView } from "./SliderView";
export function CampanaView() {
  const timeZone = "America/Lima";
  const today = new Date();
  const localNow = toZonedTime(today, timeZone);
  const formattedNow = formatInTimeZone(
    localNow,
    timeZone,
    "yyyy-MM-dd HH:mm:ss"
  );
  const to = parse(formattedNow, "yyyy-MM-dd HH:mm:ss", new Date());

  const { id } = useParams();

  const [subcampana, setSubcampana] = useState(id);
  const [dateValue, setDateValue] = useState({
    from: startOfMonth(today),
    to: to,
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
      <div className="flex items-end	">
        <DateRangePicker
          value={dateValue}
          onValueChange={handleValueChange}
          className="mx-auto max-w-md"
        />
      </div>
      <div className="mb-5">
        <MetricBySubcampana
          key={subcampana.id}
          nombre={subcampana.nombre}
          subcampana_id={subcampana.id}
          campana_id={subcampana.id}
          date_i={dateValue.from}
          date_e={dateValue.to}
        />
      </div>
      <div className="flex gap-1 h-full">
        <div className="flex-1">
          <div className="">
            <BarCharCampana
              subcampanaId={subcampana.id}
              nombre={subcampana.nombre}
              date_i={dateValue.from}
              date_e={dateValue.from}
              tipo={subcampana.meta}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="">
            <LineCharCampana
              campana={subcampana.nombre}
              id={subcampana.id}
              tipo={subcampana.meta}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
