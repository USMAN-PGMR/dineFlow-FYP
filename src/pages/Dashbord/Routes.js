import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Menu/Home'
import Profile from './Menu/Profile'
import Team from './Menu/Team'
import Orders from './Menu/Orders'
import Users from './Menu/Users'
import AddProducts from './Menu/AddProducts'
import AllProducts from './Menu/AllProducts'
import Messages from './Menu/Messages'
import Logout from './Menu/Logout'
import ContactManage from './Menu/Contact'
import Addjob from './Menu/AddJob'
import ViewApplicant from './Menu/ViewApplicant'
import Faqs from './Menu/Faqs'
import Testimonial from './Menu/Testimonial'

export default function Index() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/contactManage' element={<ContactManage/>} />
        <Route path='/team' element={<Team/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/addJob' element={<Addjob/>} />
        <Route path='/viewApplicant' element={<ViewApplicant/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/addProducts' element={<AddProducts/>} />
        <Route path='/allProducts' element={<AllProducts/>} />
        <Route path='/faqs' element={<Faqs/>} />
        <Route path='/messages' element={<Messages/>} />
        <Route path='/testimonial' element={<Testimonial/>} />
        <Route path='/logout' element={<Logout/>} />
    </Routes>
    </>
  )
}
