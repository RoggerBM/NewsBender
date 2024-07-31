import React from "react";
import { CardMetric } from "../card-campanas/CardMetric";
import { DatePicker, Button } from "@tremor/react";
import { RiSurveyLine } from "@remixicon/react";
import { CardByTitle } from "./CardByTitle";
import { SparkCampanas } from "./SparkCampanas";
export function MainResume() {
  return (
    <div>
      <div className="text-black dark:text-white font-sans flex flex-col md:flex-row  items-center justify-between my-5">
        <div className="mb-4 md:mb-0">
          <h2 className="font-bold text-lg ">Lorem ipsum dolor sit.</h2>
          <span
            className="font-light
        text-sm	"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            nesciunt inventore cumque vero porro ex quam vitae! Dolores, neque
            a.
          </span>
        </div>
        <div className="flex flex-column gap-3">
          <DatePicker
            placeholder="Seleccione una fecha"
            enableYearNavigation="true"
          />
          <Button
            icon={RiSurveyLine}
            className="font-normal text-[#E5E7EB] dark:text-[#6B7280] bg-white dark:bg-[#1F2937] dark:border-[#6B7280]
           hover:bg-gray-100 border-inherit	hover:border-inherit dark:hover:bg-0 dark:hover:border-[#6B7280]"
          >
            Resume
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-1">
        <CardByTitle title='Campaña BBVA'/>
        <CardByTitle title='Campaña SBP'/>
        <CardByTitle title='Campaña EFECTIVA'/>
      </div>
      <div className="flex flex-wrap gap-4 my-5">
        <SparkCampanas campana="BBVA" subcamapana="TLM" />
        <SparkCampanas  campana="BBVA" subcamapana="WEB"/>
        <SparkCampanas campana="BBVA" subcamapana="Portafolio" />

      </div>
    </div>
  );
}
