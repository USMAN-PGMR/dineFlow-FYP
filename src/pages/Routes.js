import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Dashbord from './Dashbord'
import { AuthContext } from '../context/AuthContext'

export default function Index() {
  const { userInfo } = useContext(AuthContext)
  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/auth/*' element={<Auth />} />
        {userInfo && userInfo.role == "admin" ? // Check if userInfo exists and has a role property
          <Route path='/dashbord/*' element={<Dashbord />} />
          : null
        }
      </Routes>
    </>
  )
}
