import React from 'react';
import { NavbarHeader } from '../components/navbar-components/NavbarHeader';
import { NavbarContent } from '../components/navbar-components/NavbarContent';
import { NavbarFooter } from '../components/navbar-components/NavbarFooter';
import './navbar-components/ScrollStyle.css';
import { NavbarHome } from './navbar-components/NavbarHome';
import { RiCloseLine,RiBarChart2Line } from '@remixicon/react';
import { Icon } from "@tremor/react";
function Navbar() {
  return (
    <div className='bg-white dark:bg-slate-800	 absolute left-0 top-0 w-72 h-screen p-2 flex flex-col gap-2 px-3 overflow-y-auto custom-scrollbar shadow-md '>
    <div className='p-4 self-end lg:hidden '>
    <Icon
          icon={RiCloseLine}
          className="rounded-full w-8 h-8 border-transparent bg-slate-400 dark:bg-white text-black dark:text-black"
          variant="solid"
          tooltip=""
        />
    </div>
    <NavbarHeader className="cursor-pointer"/>
    <div className=''>
      <hr className="border-t border-gray-300 dark:border-gray-500 " />
    </div>
    <NavbarHome link='/reporte/home'/>
    <NavbarHome title='Cuadro de mando' icon={RiBarChart2Line} link='/reporte/mando'/>

    <div className="flex-grow overflow-y-auto custom-scrollbar">
      <NavbarContent className="flex flex-col justify-center items-center space-y-4" />
    </div>


    <NavbarFooter />
  </div>
  )
}

export default Navbar