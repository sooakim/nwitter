import React from 'react'
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import Auth from './routes/Auth'
import Home from './routes/Home'
import Profile from './routes/Profile'

interface IRouterProps {
  isSigned?: boolean;
}

const Router = ({isSigned}: IRouterProps) => {
  return (
    <HashRouter>
      <Routes>
        {isSigned ?
          (
            <>
              <Route caseSensitive path="/" element={<Home/>}/>
              <Route caseSensitive path="/profile" element={<Profile/>}/>
              <Route path="*" element={<Navigate to="/"/>}/>
            </>
          ) : (
            <>
              <Route caseSensitive path="/" element={<Auth/>}/>
              <Route path="*" element={<Navigate to="/"/>}/>
            </>
          )
        }
      </Routes>
    </HashRouter>
  )
}
export default Router
