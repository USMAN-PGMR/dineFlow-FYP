import React from 'react'
import AboutHeader from '../../copmonents/Frontend/AboutHeader/AboutHeader'
import { Link } from 'react-router-dom'
import CardsLocal from '../../copmonents/Frontend/CardsLocal'
import Footer from '../../copmonents/Frontend/Footer'
import Trending from '../../copmonents/Frontend/Trending'
export default function AllProducts() {
  return (
    <>
    {/* header + heroSection */}
        <div className="allProducts text-white">
    
        
        <AboutHeader/>
        <div className="container pt-5 mt-5">
          <div className="row pt-5 pb-3 ">
            <div className="col mt-lg-5 pt-lg-5">
              <h1 style={{fontFamily:'fantasy'}}>All Products</h1>
              <h6 className='py-2 '><Link  to='/' style={{color:'white',outline:'none',textDecoration:'none'}} >Home</Link> / Menu</h6>
            </div>
          </div>
        </div>
        </div>

        {/* products cards */}
        <CardsLocal/>

        {/* Trending */}
        <Trending/>
        {/* footer */}
        <Footer/>
    </>
  )
}
