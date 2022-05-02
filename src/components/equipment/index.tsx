import { FC, useMemo } from 'react'

import { useGameData } from 'contexts/gamedata'
import {
  getArmorDefense,
  getArmorName,
  getArmorWeight,
  getTotalResistance
} from 'utils/armor'

export const Equipment: FC = () => {
  const [{ equipment, ...data }, setGameData] = useGameData()

  const debug = () => {
    setGameData({
      ...data,
      equipment: {
        weapons: {
          melee: null,
          ranged: null,
        },
        armor: {
          head: null,
          legs: {
            slot: 'legs',
            layers: {
              top: null,
              middle: null,
              bottom: 'leatherPants'
            }
          },
          arms: {
            slot: 'arms',
            layers: {
              top: null,
              middle: null,
              bottom: 'leatherGloves'
            }
          },
          torso: {
            slot: 'torso',
            layers: {
              top: 'ironCuirass',
              middle: 'ironPlate',
              bottom: 'leatherGambeson',
            }
          }
        }
      }
    })
  }

  const slots = useMemo(() => [
    'head',
    'torso',
    'legs',
    'arms',
  ] as const, [])

  const elementalResistance = useMemo(() => (
    getTotalResistance(equipment.armor)
  ), [equipment.armor])

  return (
    <div>
      <h3>Armor</h3>
      {slots.map((slot) => {
        const armor = equipment.armor[slot]
        return (
          <div key={`armor-${slot}`}>
            {slot}: {armor ? getArmorName(armor) : 'Empty'}
            {armor && (
              <div>
                <ul>
                  <li>Defense: {getArmorDefense(armor)}</li>
                  <li>Weight: {getArmorWeight(armor)}</li>
                </ul>
              </div>
            )}
          </div>
        )
      })}
      <h4>Resistances</h4>
      <ul>
        {Object.entries(elementalResistance).map(([key, res]) => (
          <li key={`res-${key}`}>{key}: {res}%</li>
        ))}
      </ul>
      <button onClick={debug}>Debug !</button>
    </div>
  )
}
