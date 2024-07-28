import React from 'react'
import { Card, List, ListItem, Title } from '@tremor/react';

export function NavbarHeader() {
  return (
      <div className="max-w-full bg-white dark:bg-slate-800	">
        <div className="flex justify-between items-center space-x-4	">
          <div className="flex flex-col">
            <h3 className="text-lg font-serif text-left text-black dark:text-white font-medium ">Bender News</h3>
            <span className='text-xs	 text-sky-400
            dark:text-sky-200 italic'>Dashboard</span>
          </div>
          <img src="/bender_logo.ico" alt="" className="bender size-16" />
        </div>
    </div>
  )
}
