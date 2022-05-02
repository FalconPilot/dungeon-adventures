import { FC } from 'react'

import { Equipment } from 'components/equipment'
import { Inventory } from 'components/inventory'

export const Main: FC = () => {
  return (
    <main>
      <Equipment />
      <Inventory />
    </main>
  )
}
