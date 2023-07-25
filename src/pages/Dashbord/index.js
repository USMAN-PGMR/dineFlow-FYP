import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashhome from './Dashhome'

export default function index() {
  return (
    <>
    <Routes>
        <Route path='home/*' element={<Dashhome/>}/>
    </Routes>
    </>
  )
}
