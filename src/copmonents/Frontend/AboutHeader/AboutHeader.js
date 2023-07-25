import React from 'react'
import lightLogo from '../../../assets/logo-light.png'
import { Link } from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io';
import { BsHandbag } from 'react-icons/bs';
export default function AboutHeader() {
  return (
    <div className="aboutHeader">

   
    <nav className="navbar secondNav navbar-expand-lg py-0  bg-transparent  ">
    <div className="container px-0 py-0 my-0 ">
      <a className="navbar-brand mx-0   px-0" ><img className='w-75 ps-2 py-1  ' src={lightLogo} alt="" /></a>
      {/* only on small screen */}
      <div className="d-column align-items-end  justify-content-end  d-sm-block d-lg-none  ">
            {/* <i className="btn fa fa-search px-0 mx-0 "></i> */}
            {/* <i className="btn ms-1 fa fa-search px-0 mx-0 text-end"></i> */}
            <i className='btn btnNavAbout py-0 px-0 mx-0'style={{fontSize:'20px'}}><BsHandbag /></i>
            <i className='btn btnNavAbout py-0  pe-0 ps-1   mx-0' style={{fontSize:'20px'}}><  IoIosSearch /></i>
          </div>
     
      <button className="navbar-toggler text-white  border-0 btn " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="fa-solid fa-bars text-white   px-0 mx-0"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto   mb-2 mb-lg-0">
          <li className="nav-item ">
            <Link className="nav-link   fw-semibold mx-lg-2" aria-current="page" to='/'>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/about'>About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/contact'>Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/auth/login'>Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/auth/register'>Register</Link>
          </li>   
        </ul>
        <ul className=' my-0 py-0'>
  
        {/* <form className="d-flex bg-dark " role="search"> */}
        <div className="  d-none d-lg-flex  my-0 py-0">
            {/* <div className="btn btn-danger rounded-0 py-4 px-3 fw-bold   " style={{fontSize:'21px'}}> <span className='mt-1 d-inline-block'>Order Now</span> </div> */}
            <div className="   py-4  fw-bolder px-2">
              <button className='bg-transparent border-0 px-3 border btnNavAbout  ' style={{fontSize:'25px'}} ><BsHandbag /></button>
              <button className='bg-transparent  border-0 px-2 btnNavAbout  ' style={{fontSize:'25px'}}><  IoIosSearch /></button>
            </div>
          </div>
        {/* <div className="bg-danger  d-none d-lg-inlineblock  my-0 py-0">
            <div className="btn py-4 text-white fw-bolder">Order Now</div>
          </div> */}
        {/* </form> */}
        </ul>
      </div>
    </div>
  </nav>
</div>
  )
}
