import React from 'react'
import {
  AccordionList
} from '@tremor/react';
import { AcordionsCampana } from './AcordionsCampana';
import { getAllCampanas } from '../../api/campanas.api';
import { useEffect, useState } from 'react';
export function NavbarContent() {
  const [campains,setCampanas] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

    useEffect(()=>{
      async function loadCampanas() {
        const res = await getAllCampanas();
        setCampanas(res.data);
      }
      loadCampanas();
    },[]);

    const handleAccordionClick = (id) => {
      setActiveAccordion((prevId) => (prevId === id ? null : id));
    };
    const acordionList = campains.map((v) => (
      <AcordionsCampana
        key={v.id}
        campana={v.nombre}
        descripcion={v.descripcion}
        campanaId={v.id}
        isOpen={activeAccordion === v.id}
        onClick={() => handleAccordionClick(v.id)}
      />
    ));

  return (
      <AccordionList className="max-w-full	">
        {acordionList}
      </AccordionList>
  )
}

