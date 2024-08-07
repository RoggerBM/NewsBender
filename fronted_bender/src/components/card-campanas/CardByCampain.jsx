import React from "react";
import { DatePicker, DateRangePicker } from "@tremor/react";
import { useEffect, useState } from "react";
import { getSubcampanasByCampana } from "../../api/campanas.api";
import { MetricBySubcampana } from "./MetricBySubcampana";
import { parse,startOfDay,format , endOfDay,startOfMonth,addDays,subDays,subHours } from "date-fns";
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';


export function CardByCampain({
  campana = "Lorem, ipsum.",
  img = "/vite.svg",
  campanaId,
}) {
  const timeZone = 'America/Lima';
  const today = new Date();
  const localNow = toZonedTime(today, timeZone);
  const formattedNow = formatInTimeZone(localNow, timeZone, 'yyyy-MM-dd HH:mm:ss');
  const to = parse(formattedNow, 'yyyy-MM-dd HH:mm:ss', new Date());

  const [subcampanas, setSubcampanas] = useState([]);
  const [dateValue, setDateValue] = useState({
    from: startOfMonth(today),
    to: to
  });
  console.log("HORA LOCAL",startOfMonth(today));
  console.log("HORA FINAL:", to);
  console.log("ISO DATE inicial",startOfMonth(today).toISOString());
  console.log("ISO DATE final",to.toISOString());

  useEffect(() => {
    async function loadSubcampanas() {
      const res = await getSubcampanasByCampana(campanaId);
      setSubcampanas(res.data);
    }
    loadSubcampanas();
  }, [campanaId]);
  const handleValueChange = (value) => {
    setDateValue(value);
    console.log("Selected Date Range:", value);
  };
  const subcampanaMetric = subcampanas.map((v) => {
    return (
      <MetricBySubcampana
        key={v.id}
        nombre={v.nombre}
        subcampana_id={v.id}
        campana_id={campanaId}
        date_i = {dateValue.from}
        date_e = {dateValue.to}
      />
    );
  });
  return (
    <div className="border border-slate-200	 rounded-lg p-4 dark:border-cyan-200 mb-2">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4 items-center">
          <img src={img} alt="" className="w-8 h-8 rounded-md" />
          <h2 className="text-bold">{campana}</h2>
        </div>
        <div>
          <DateRangePicker
            value={dateValue}
            onValueChange={handleValueChange}
            className="mx-auto max-w-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-2  gap-6">{subcampanaMetric}</div>
    </div>
  );
}
