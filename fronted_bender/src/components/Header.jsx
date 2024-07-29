import React from 'react'

export function Header() {
  return (
    <div className='bg-white dark:bg-slate-800 p-4 shadow-sm flex justify-between  '>
      <div>
        <h2 className="">Este es el header</h2>
      </div>
      <div>
        <img src="./user.svg" alt="bender" className='rounded-full size-8 bg-slate-400 dark:bg-white' />
      </div>
    </div>
  )
}
