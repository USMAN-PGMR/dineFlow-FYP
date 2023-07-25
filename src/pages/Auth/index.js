import React from 'react'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import { Route, Routes } from 'react-router-dom'

export default function Index() {
  return (
    <>
    <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="forgotPassword" element={<ForgotPassword/>} />
    </Routes>
    </>
  )
}
