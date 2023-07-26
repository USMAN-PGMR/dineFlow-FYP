import React, { useContext } from 'react'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './Cart'
import CheckOut from './CheckOut'
import CardsLocal from '../../copmonents/Frontend/CardsLocal/CardsLocal'
import NoPage from '../Dashbord/NoPage'
import PrivateRoute from '../PrivateRoute'
import { AuthContext } from '../../context/AuthContext'

export default function Index() {
  const isAuthenticated = useContext(AuthContext)
  return (
    <>

      {/* <main> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about' element={<About />} />
        <Route path="cart" element={<PrivateRoute Component={Cart}/>}/>
        <Route path='checkout' element={<CheckOut />} />
        <Route path='cards-local' element={<CardsLocal />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      {/* </main> */}
      {/* <Footer/> */}
    </>
  )
}
