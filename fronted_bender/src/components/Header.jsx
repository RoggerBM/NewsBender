import React from 'react'
import { Icon } from "@tremor/react";
import { RiBubbleChartLine } from "@remixicon/react";

export function Header() {
  return (
    <div className='bg-white dark:bg-slate-800 p-4 shadow-sm flex justify-between  '>
      <div>
        <h2 className="font-bold text-lg">EQUIPO IC</h2>
      </div>
      <div>
        <Icon
          icon={RiBubbleChartLine}
          className="rounded-full w-8 h-8 border-transparent bg-slate-400 dark:bg-white text-black dark:text-black"
          variant="solid"
          tooltip=""
        />
      </div>
    </div>
  )
}
