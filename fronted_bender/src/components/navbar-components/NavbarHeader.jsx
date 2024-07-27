import React from 'react'
import { Card, List, ListItem, Title } from '@tremor/react';

export function NavbarHeader() {
  return (
      <Card className="bg-white max-w-full	">
      <div className="flex justify-between	">
        <div className="flex flex-col">
          <h3 className="text-lg font-serif text-left text-[#F7F735] font-medium ">BENDER NEWS</h3>
          <span className='text-xs	 text-sky-200 italic'>Dashboard</span>
        </div>
        <img src="/bender_logo.ico" alt="" className="bender size-16" />
      </div>
    </Card>
  )
}
