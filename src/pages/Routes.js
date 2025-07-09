import React, { useContext} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashbord from './Dashbord'
import { AuthContext } from '../context/AuthContext'
import PrivateRoute from './PrivateRoute'

export default function Index() {
  const { userInfo } = useContext(AuthContext)
  const { isAuthenticated } = useContext(AuthContext)
  console.log('isAuthenticated', isAuthenticated)


  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to="/"/>} />
        {userInfo && userInfo.role == "admin" ? // Check if userInfo exists and has a role property
          <Route path='/dashbord/*' element={<PrivateRoute Component={Dashbord}/>} />
          : null
        }
      </Routes>
    </>
  )
}
