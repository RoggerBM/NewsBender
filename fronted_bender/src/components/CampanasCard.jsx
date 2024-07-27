import React from 'react'
import { Card, Divider } from '@tremor/react';

function CampanasCard({title = "TITULO",description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ex accusantium voluptate repellendus magnam sit accusamus, ab, atque impedit voluptates maiores magni molestias? At numquam incidunt, ipsa natus voluptates voluptatem?",imagen=""}) {
  return (
    <Card className="mx-auto max-w-xs card">
        <h2 className="text-center text-slate-400 text-white">{title}</h2>
        <Divider className="border-t-2 border-red-500"></Divider>
        <p className="text-tremor-default text-tremor-content text-white">{description}</p>
        <div className="flex justify-center	content-center	">
          <img className= "items-center	my-2 max-w h-auto rounded-md size-64" src={imagen} alt={title + " img"}></img>
        </div>
    </Card>  )
}

export default CampanasCard