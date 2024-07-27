import React from 'react';

import {
    Accordion,
    AccordionBody,
    AccordionHeader  } from '@tremor/react';
import {ListSubcampana} from './ListSubcampana'
import { getSubcampanasByCampana } from '../../api/campanas.api';
import { useEffect, useState } from 'react';

export function AcordionsCampana({campana="campana",descripcion = "Es una descripcion", campanaId,isOpen,onClick}) {
  const [subcampanas, setSubcampanas] = useState([]);
  useEffect(() => {
    async function loadSubcampanas() {
        const res = await getSubcampanasByCampana(campanaId);
        setSubcampanas(res.data);
    }loadSubcampanas();
  }, [campanaId]);
  const subcampanasList = subcampanas.map(v=>{
    return <ListSubcampana key = {v.id} nombre={v.nombre} descripcion = {v.descripcion}/>
  })
  console.log("isOpen:", isOpen);
  return (
    <div>
        <Accordion className='bg-emerald-800 max-w-full dark:bg-emerald-950 border-transparent	dark:border-transparent'>
          <AccordionHeader className="text-sm font-medium" onClick={onClick} >
            <h2 className="text-white font-sans">
            {campana}
            </h2>
          </AccordionHeader>
          {isOpen && (
          <AccordionBody className="leading-6 ">
            {subcampanasList}
          </AccordionBody>
          )}
    </Accordion>
  </div>
  )
}

