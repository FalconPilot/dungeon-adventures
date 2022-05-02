import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import { useLocalStorage } from 'react-use'

import { GameData, GameDataSchema } from 'types'

export const initialGameData: GameData = {
  character: {
    name: 'New player',
    level: 1,
    stats: {
      strength: 1,
      dexterity: 1,
      agility: 1,
      wits: 1,
    },
  },
  equipment: {
    weapons: {
      melee: null,
      ranged: null,
    },
    armor: {
      head: null,
      torso: null,
      legs: null,
      arms: null,
    }
  },
  inventory: []
}

export const GameDataContext = createContext<[GameData, (d: GameData) => void]>([
  initialGameData,
  () => {}
])

export const GameDataProvider: FC<{
  children: ReactNode,
}> = ({ children }) => {
  const [rawData, setStorageData] = useLocalStorage('gamedata', initialGameData)

  const storageData = useMemo(() => {
    try {
      return GameDataSchema.parse(rawData)
    } catch (err) {
      console.error(err)
      setStorageData(initialGameData)
      return initialGameData
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [gameData, setStateGD] = useState<GameData>(storageData)

  const setGameData = useCallback((data: GameData): void => {
    setStateGD(data)
    setStorageData(data)
  }, [setStorageData])

  return (
    <GameDataContext.Provider value={[gameData, setGameData]}>
      {children}
    </GameDataContext.Provider>
  )
}

export const useGameData = () => {
  const data = useContext(GameDataContext)

  if (!data) {
    throw new Error('GameData context is unavailable')
  }

  return useMemo(() => data, [data])
}
