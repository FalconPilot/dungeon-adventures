import { FC, useEffect, useState } from 'react'

import { Header } from 'components/header'
import { Main } from 'components/main'

const Index: FC = () => {
  const [shouldRender, setRender] = useState<boolean>(false)

  useEffect(() => {
    if (!!window) {
      setRender(true)
    }
  }, [])

  if (!shouldRender) {
    return null
  }

  return (
    <>
      <Header />
      <Main />
    </>
  )
}

export default Index
