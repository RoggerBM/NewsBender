import React, { useEffect, useState } from 'react'
import { Card, Icon, Button } from '@tremor/react';
import { RiToolsFill, RiComputerLine, RiContrast2Fill } from '@remixicon/react';
import { Link } from 'react-router-dom'
export function NavbarFooter() {
  const [theme,setTheme] = useState('light');
  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }
  useEffect(()=>{
    if(theme==="dark"){ 
      document.querySelector('html').classList.add('dark')
       }else{
        document.querySelector('html').classList.remove('dark')

       }
  },[theme])
  return (
      <Card className="bg-emerald-800  dark:bg-emerald-950 mx-auto max-w-full	border-transparent	dark:border-transparent h-[4rem] flex justify-center items-center">
        <div className="h-auto w-auto flex gap-4 justify-center items-center dark:text-white">
          <Button className='size-8' onClick={handleChangeTheme}>
              <Icon
                icon={RiContrast2Fill}
                className='bg-white text-black dark:bg-black dark:text-white dark:border-transparent'
                variant="solid"
                tooltip=""
              />
          </Button>
          <Link to = "/campanas">
          <Icon
              icon={RiComputerLine}
              className='bg-white text-black dark:bg-black dark:text-white dark:border-transparent'
              variant="solid"
              tooltip=""
            />
          </Link>
          <Link to = "/campanas">
          <Icon
              icon={RiToolsFill}
              className='bg-white text-black dark:bg-black dark:text-white dark:border-transparent'
              variant="solid"
              tooltip=""
            />
          </Link>
        </div>
      </Card>
  )
}
