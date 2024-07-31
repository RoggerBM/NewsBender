import React from "react";
import { RiMedalLine } from "@remixicon/react";
import { Icon } from "@tremor/react";
import { CardMetric } from "../card-campanas/CardMetric";
export function CardByTitle({title='Lorem ipsum dolor sit amet.',subtitle='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit optio!'}) {
  return (
    <div className="border border-slate-200	 rounded-lg p-4 dark:border-cyan-200 ">
      <div className="flex gap-4 my-5">
        <Icon
          icon={RiMedalLine}
          className="w-8 h-8 border-transparent bg-transparent dark:bg-transparent text-black dark:text-white"
          variant="solid"
          tooltip=""
        />
        <div className="text-sm flex flex-col">
          <h2 className="font-bold">{title}</h2>
          <span>
            {subtitle}
          </span>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <CardMetric title='Venta' value='5000' percent='2.1'/>
        <CardMetric/>
        <CardMetric title='Gestionada' value='45000' percent='0.0'/>
      </div>
    </div>
  );
}
