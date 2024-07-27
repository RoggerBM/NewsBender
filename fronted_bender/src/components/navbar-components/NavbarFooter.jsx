import React from 'react'
import { Card, Icon } from '@tremor/react';
import { RiToolsFill, RiComputerLine, RiContrast2Fill } from '@remixicon/react';
import { Link } from 'react-router-dom'

export function NavbarFooter() {
  return (
      <Card className="mx-auto max-w-full	">
        <div className=" mx-auto p-4 flex justify-center space-x-6">
          <Link to = "/campanas">
            <Icon
              style={{ backgroundColor: 'white', color: 'black' }}
              icon={RiComputerLine}
              variant="solid"
              tooltip=""
            />
          </Link>
          <Link to = "/campanas">
          <Icon
              style={{ backgroundColor: 'white', color: 'black' }}
              icon={RiContrast2Fill}
              variant="solid"
              tooltip=""
            />
          </Link>
          <Link to = "/campanas">
          <Icon
              style={{ backgroundColor: 'white', color: 'black' }}
              icon={RiToolsFill}
              variant="solid"
              tooltip=""
            />
          </Link>
        </div>
      </Card>
  )
}
