import React from 'react'
import { List, ListItem, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'


export function ListSubcampana({nombre='',descripcion=''}) {

  return (
    <div>
      <List className="mt-2">
          <ListItem>
          <Link to = "/campanas">
            <span className="text-white text-xs	font-sans	">
            {nombre} 
            </span>
          </Link>
          </ListItem>
      </List>
    </div>
  )
}