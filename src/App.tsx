import React, {useEffect, useState} from 'react'
import Router from './Router'
import {setSignChanged} from './libs/firebase/auth'

const App: React.FC = () => {
  const [isInitialized, setInitialized] = useState(false)
  const [isSigned, setSigned] = useState(false)

  useEffect(() => {
    return setSignChanged(({isSigned}) => {
      setSigned(isSigned)
      setInitialized(true)
    })
  }, [])

  return (
    <>
      {isInitialized ?
        <Router isSigned={isSigned}/> :
        <span>Initializing...</span>
      }
    </>
  )
}

export default App
