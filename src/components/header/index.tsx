import { useGameData } from 'contexts/gamedata'
import { FC } from 'react'

export const Header: FC = () => {
  const [{ character }] = useGameData()

  return (
    <header>
      {character.name}, level {character.level}
    </header>
  )
}
