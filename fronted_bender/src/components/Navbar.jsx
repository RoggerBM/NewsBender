import React from 'react'
import { NavbarHeader } from '../components/navbar-components/NavbarHeader'
import { NavbarContent } from '../components/navbar-components/NavbarContent'
import { NavbarFooter } from '../components/navbar-components/NavbarFooter'
function Navbar() {
  return (
    <div className='size-72 h-screen p-2 flex flex-col gap-2 px-3 overflow-y-auto'>
        <NavbarHeader/>
        <div className="flex-grow overflow-y-auto">
          <NavbarContent className="  justify-center	items-center	" />
        </div>
        <NavbarFooter/>
    </div>
  )
}

export default Navbar