import { useGameData } from 'contexts/gamedata'
import { FC } from 'react'

export const Inventory: FC = () => {
  const [{ inventory }] = useGameData()

  return (
    <div>
      <h3>Inventory</h3>
      {inventory.length === 0 ? 'Empty' : (
        <ul>
          {inventory.map((item, idx) => (
            <li key={`${idx}`}>TODO</li>
          ))}
        </ul>
      )}
    </div>
  )
}
