import React from 'react';
import { Link } from 'react-router-dom'
import {  Icon } from '@tremor/react';
import { RiHomeOfficeLine} from '@remixicon/react';
export function NavbarHome({title='Home',icon=RiHomeOfficeLine,link='/campanas'}) {
  return (
    <div>
        <Link to = {link}>
        <div className='px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 rounded-lg cursor-pointer'>
            <div className="text-black flex justify-between items-center">
                <h2 className="text-black dark:text-white text-sm font-medium ">{title}</h2>
                <Icon
                    icon={icon}
                    className='w-8 h-8 border-transparent bg-transparent dark:bg-transparent text-black dark:text-white'
                    variant="solid"
                    tooltip=""
                />
            </div>
        </div>
        </Link>
    </div>
  )
}

