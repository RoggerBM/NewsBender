import React from 'react'
import Navbar from '../components/Navbar'
import {Body} from '../components/Body'
import {Header} from '../components/Header'
function PageReport() {
  return (
    <div className='relative bg-[#D5D5D5] dark:bg-slate-950 w-full h-screen'>
      <div className='md:w-64 fixed hidden md:block'>
        <Navbar/>
      </div>
      <div className='md:ml-[18rem] text-black dark:text-white'>
        <Header/>
        <Body/>
      </div>

    </div>
  )
}

export default PageReport