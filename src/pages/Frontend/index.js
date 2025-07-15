import React, { useContext } from 'react'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import { Navigate, Route, Routes } from 'react-router-dom'
import Cart from './Cart'
import CheckOut from './CheckOut'
// import CardsLocal from '../../copmonents/Frontend/CardsLocal/CardsLocal'
import NoPage from '../Dashbord/NoPage'
import PrivateRoute from '../PrivateRoute'
import { AuthContext } from '../../context/AuthContext'
import Userprofile from './Userprofile'
import MyOrder from './MyOrder'
import Jobs from './Jobs'
import AllProducts from './AllProducts'
import Faqs from './Faqs'
import PrivacyPolicy from './PrivacyPolicy'
import TermsConditions from './TermsConditions'

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
        <Route path='checkout' element={<PrivateRoute Component={CheckOut}/>} />
        <Route path='userProfile' element={<PrivateRoute Component={Userprofile}/>} />
        <Route path='my-order' element={<PrivateRoute Component={MyOrder}/>} />
        <Route path='allProducts' element={<AllProducts/>} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='faqs' element={<Faqs />} />
        <Route path='privacy' element={<PrivacyPolicy />} />
        <Route path='terms' element={<TermsConditions />} />
        <Route path='*' element={<NoPage />} />
      </Routes>
      {/* </main> */}
      {/* <Footer/> */}
    </>
  )
}
