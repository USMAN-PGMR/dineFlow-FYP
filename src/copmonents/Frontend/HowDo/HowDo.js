import React from 'react'
import { Link } from 'react-router-dom'

export default function HowDo() {
  return (
    <div className="container mt-5 pt-4">
          <div className="row">
            <div className="col-12 text-center ">
              <h5 className='text-danger pt-1' style={{ fontFamily: 'fantasy' }}>How We Do It</h5>
              <h1 className='pt-1' style={{ fontFamily: 'fantasy' }}>We Deliver Your Food In 4 Steps</h1>

            </div>
            <div className="col-md-6 offset-md-3 text-center mt-2">
              <p className='text-secondary'>Whether you're at home, work, or on the go, ordering your favorite meals has never been easier. Our process is designed to be quick, convenient, and reliable from exploring the menu to enjoying freshly prepared dishes delivered to your doorstep. </p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 mt-3 mt-md-0 col-md-6 col-lg-3 text-center  ">
              {/* <RiComputerLine /> */}
              <i style={{ fontSize: '50px' }} className="fa-solid fa-computer my-3 text-danger "></i>
              <h4 style={{ fontFamily: 'fantasy' }}>Order</h4>
              <p className='text-secondary px-2'>Explore our updated menu, customize your meal, and place your order in seconds</p>

            </div>
            <div className="col-12 mt-3 mt-lg-0 col-md-6 col-lg-3 text-center  ">
              {/* <RiComputerLine /> */}
              <i style={{ fontSize: '50px' }} className="fa-solid fa-fire-flame-curved my-3 text-danger "></i>
              <h4 style={{ fontFamily: 'fantasy' }}>Cook</h4>
              <p className='text-secondary px-2'>Our chefs prepare your food fresh using top-quality ingredients with great care.

</p>

            </div>
            <div className="col-12 mt-3 mt-lg-0 col-md-6 col-lg-3 text-center  ">
              {/* <RiComputerLine /> */}
              <i style={{ fontSize: '50px' }} className="fa-solid fa-truck my-3 text-danger "></i>
              <h4 style={{ fontFamily: 'fantasy' }}>Deliver</h4>
              <p className='text-secondary'>We pack your meal securely and deliver it hot and on time, right to your doorstep.</p>

            </div>
            <div className="col-12 mt-3 mt-lg-0 col-md-6 col-lg-3 text-center  ">
              {/* <RiComputerLine /> */}
              <i style={{ fontSize: '50px' }} className="fa-solid fa-bowl-food my-3 text-danger "></i>
              <h4 style={{ fontFamily: 'fantasy' }}>Enjoy</h4>
              <p className='text-secondary'>Unbox, relax, and enjoy restaurant-style food in the comfort of your home.</p>

            </div>
            <div className="col-12 text-center">
              <Link className="nav-link text-white zoom-button  py-3 px-4 bg-danger fw-semibold mt-4  " to='/allProducts' style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                ORDER ONLINE
                {/* <span className="zoom-overlay"></span> */}
              </Link>
            </div>
          </div>
        </div>
  )
}
