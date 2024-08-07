import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";

export function SliderView() {
  const [value, setValue] = useState(5);

  function valuetext(value) {
    return `${value} días`;
  }

  // Manejador de cambio del slider
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value);
  return (
    <div className="border border-slate-200	 rounded-lg p-4 bg-white dark:bg-slate-800 mt-2">
      <div className="px-8">
        <Slider
          aria-label="Días"
          defaultValue={value}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={31}
          onChange={handleChange}
          color="lime"
        />
      </div>

      <p className="border border-slate-200	 rounded-lg p-4 bg-white dark:bg-slate-800 text-xs font-semibold text-teal-600">
        Valor seleccionado: Día {value}
      </p>
    </div>
  );
}
