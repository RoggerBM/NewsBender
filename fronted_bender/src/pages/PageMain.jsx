import React from 'react'
import CampanasCard from '../components/CampanasCard';
import './PageMain.css';
import {getAllCampanas} from '../api/campanas.api'
import { useEffect, useState } from 'react';
function PageMain() {
    const [campanas,setCampanas] = useState([]);
    useEffect(()=>{
      async function loadCampanas() {
        const res = await getAllCampanas();
        setCampanas(res.data);
      }
      loadCampanas();
    },[]);

    const campanasList = campanas.map(v=>{
        return <CampanasCard key = {v.id} title={v.nombre} description = {v.descripcion} imagen = {v.imagen}/>
      })
  return (
    <div className="main">
      <h1 className='titulo-campanas'>CAMPAÑAS</h1>
      <div className="contenido">
       {campanasList}
      </div>
    </div>
  )
}

export default PageMain