import React from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'
import Auth from './routes/Auth'
import Home from './routes/Home'

interface IRouterProps {
  isSigned?: boolean;
}

const Router = ({isSigned}: IRouterProps) => {
  return (
    <HashRouter>
      <Routes>
        {isSigned ?
          (<>
            <Route caseSensitive path="/" element={<Home/>}/>
          </>) : (
            <Route caseSensitive path="/" element={<Auth/>}/>
          )
        }
      </Routes>
    </HashRouter>
  )
}
export default Router
