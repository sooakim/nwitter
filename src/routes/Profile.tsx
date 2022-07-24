import React, {MouseEvent, useCallback} from 'react'
import {logout} from '../libs/firebase/auth'

const Profile = () => {
  const logoutClick = useCallback(async (_: MouseEvent<HTMLButtonElement>) => {
    await logout()
  }, [])

  return (
    <div>
      <span>Profile</span>
      <button onClick={logoutClick}>로그아웃</button>
    </div>
  )
}
export default Profile
