import React, {MouseEvent, useCallback} from 'react'
import {logout} from '../libs/firebase/auth'

const Home = () => {
  const logoutClick = useCallback(async (_: MouseEvent<HTMLButtonElement>) => {
    await logout()
  }, [])

  return (
    <div>
      <span>Home</span>
      <button onClick={logoutClick}>로그아웃</button>
    </div>
  )
}
export default Home
