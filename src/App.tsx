import React, {useEffect, useState} from 'react'
import Router from './Router'
import * as auth from './libs/firebase/auth'
import {setSignChanged} from './libs/firebase/auth'

const App: React.FC = () => {
  const [isInitialized, setInitialized] = useState(false)
  const [isSigned, setSigned] = useState(auth.isSigned)

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
