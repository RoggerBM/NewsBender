import React from "react";

export function SubMetricCampana({
  title = "Lorem, ipsum.",
  value = "2563.00",
  val1 = "212",
  val2 = "15.8",
}) {
  const labelText = title === "mount" ? "Monto Desembolsado" : title === "count" ? "Tarjetas Formalizadas" : title;

  return (
    <div className="border border-slate-200 rounded-lg p-6 dark:border-cyan-200 flex flex-col bg-white dark:bg-slate-800 shadow-md flex-grow min-w-0 cursor-grab">
      <h2 className="text-xs font-semibold text-blue-500 mb-1">{labelText}</h2>
      <div className="flex justify-center items-center">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {value}
      </h1>
      </div>
      <div className="flex justify-center items-center text-sm text-gray-600 dark:text-gray-300">
        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
          {val1}
        </span>
        <hr className="mx-4 h-6 border-l border-gray-300 dark:border-gray-600" />
        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
          {val2}
        </span>
      </div>
    </div>
  );
}
