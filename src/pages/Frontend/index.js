import React from 'react'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import { Route, Routes } from 'react-router-dom'
import Cart from './Cart'
import CheckOut from './CheckOut'
import CardsLocal from '../../copmonents/Frontend/CardsLocal/CardsLocal'

export default function Index() {
  return (
    <>
    
    {/* <main> */}

    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='about' element={<About/>} />
        <Route path='cart' element={<Cart/>} />
        <Route path='checkout' element={<CheckOut/>} />
        <Route path='cards-local' element={<CardsLocal/>} />
    </Routes>
    {/* </main> */}
    {/* <Footer/> */}
    </>
  )
}
