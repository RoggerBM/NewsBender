import React from "react";
import { CardByCampain } from "./card-campanas/CardByCampain";
import { getAllCampanas } from "../api/campanas.api";
import { useEffect, useState } from 'react';

export function CuadroMando() {
  const [campains, setCampanas] = useState([]);
  useEffect(() => {
    async function loadCampanas() {
      const res = await getAllCampanas();
      setCampanas(res.data);
    }
    loadCampanas();
  }, []);
  const campanasList = campains.map((v) => (
    <CardByCampain
      key={v.id}
      campana={v.nombre}
      img={v.imagen}
      campanaId={v.id}
    />
  ));
  return (
    <div className="">
        {campanasList}
    </div>
  );
}
