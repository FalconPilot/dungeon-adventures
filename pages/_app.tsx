import { FC } from 'react'

import { AppProps } from 'next/app'

import { GameDataProvider } from 'contexts/gamedata'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GameDataProvider>
      <Component {...pageProps} />
    </GameDataProvider>
  )
}

export default App
