import React from 'react';

import {
    Accordion,
    AccordionBody,
    AccordionHeader  } from '@tremor/react';
import {ListSubcampana} from './ListSubcampana'
import { getSubcampanasByCampana } from '../../api/campanas.api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export function AcordionsCampana({campana="campana",imagen = "Es una descripcion", campanaId,isOpen,onClick}) {
  const [subcampanas, setSubcampanas] = useState([]);
  useEffect(() => {
    async function loadSubcampanas() {
        const res = await getSubcampanasByCampana(campanaId);
        setSubcampanas(res.data);
    }loadSubcampanas();
  }, [campanaId]);
  const subcampanasList = subcampanas.map(v=>{
    return <Link to={`/reporte/subcampana/${v.id}`} key={v.id}><ListSubcampana key = {v.id} nombre={v.nombre} descripcion = {v.descripcion}/></Link>
  })
  const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);
  useEffect(() => {
    setIsAccordionOpen(isOpen);
  }, [isOpen]);
  return (
    <div>
        <Accordion className='bg-white max-w-full dark:bg-slate-800 border-transparent	dark:border-transparent'
        defaultOpen={isAccordionOpen}>
          <AccordionHeader className="text-sm font-medium" onClick={onClick} >
          <div className="flex items-center space-x-4">
          <img className="w-8 h-8 rounded-md" src={imagen} alt={`${campana} img`} />
          <h2 className="text-black dark:text-white font-sans">{campana}</h2>
        </div>
            
          </AccordionHeader>
          
          <AccordionBody className="leading-6 ">
            {subcampanasList}
          </AccordionBody>
          
          
    </Accordion>
  </div>
  )
}

