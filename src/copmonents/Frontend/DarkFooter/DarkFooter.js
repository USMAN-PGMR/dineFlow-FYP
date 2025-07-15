import React from 'react'
import lightLogo from '../../../assets/logo-light.png'
import { Link } from 'react-router-dom'
export default function DarkFooter() {
  return (
    <>
      <div className="footer bg-dark text-white ">
        <div className="container py-5">
          <div className="row pt-4">
            <div className="col-12 col-md-6 text-center text-lg-start">
              <img src={lightLogo} alt="" />
            </div>
            <div className="col-12 col-md-6 text-center text-lg-end mt-md-3  ">
              <img className='btn w-25 mx-0 px-0 mt-1' src="http://androthemes.com/themes/react/slices/assets/img/android.png" alt="" />
              <img className='btn w-25 mx-0 px-0 mt-1' src="http://androthemes.com/themes/react/slices/assets/img/ios.png" alt="" />
            </div>
          </div>
          <div className="row   mt-md-4 ">
            {/* information */}
            <div className="col-12 col-md-5 text-center text-lg-start pt-5">
              <h5 style={{ fontFamily: 'fantasy' }}>Information</h5>

              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/">
                <span className="icon">&gt;</span>
                <span className='btnText'>Home</span>
              </Link>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/allProducts">
                <span className="icon">&gt;</span>
                <span className='btnText'>Menu</span>
              </Link>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/faqs">
                <span className="icon">&gt;</span>
                <span className='btnText'>FAQ's</span>
              </Link>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/about">
                <span className="icon">&gt;</span>
                <span className='btnText'>About us</span>
              </Link>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/contact">
                <span className="icon">&gt;</span>
                <span className='btnText'>Contact Us</span>
              </Link>


            </div>
            {/* top Items */}
            {/* <div className="col-12 col-md-6 col-lg-3 text-center text-lg-start pt-5">
            <h5 style={{ fontFamily: 'fantasy' }}>Top Items</h5>
            <button className="col-12 mt-2 darkCustom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Peperoni</span>
            </button>
            <button className="col-12 mt-2 darkCustom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Swiss Mushroom</span>
            </button>
            <button className="col-12 mt-2 darkCustom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>Barbeque Chicken</span>
            </button>
            <button className="col-12 mt-2 darkCustom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Vegetarian</span>
            </button>
            <button className="col-12 mt-2 darkCustom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>Harm & Cheese</span>
            </button>
          </div> */}
            {/* others */}
            <div className="col-12 col-md-4  text-center text-lg-start pt-5">
              <h5 style={{ fontFamily: 'fantasy' }}>Others</h5>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/checkout">
                <span className="icon">&gt;</span>
                <span className='btnText'>Checkout</span>
              </Link>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/cart">
                <span className="icon">&gt;</span>
                <span className='btnText'>Cart</span>
              </Link>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/allProducts">
                <span className="icon">&gt;</span>
                <span className='btnText'>Products</span>
              </Link>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/UserProfile">
                <span className="icon">&gt;</span>
                <span className='btnText'>Profile</span>
              </Link>
              <Link className="nav-link col-12 mt-2 darkCustom-button  text-center text-lg-start" to="/my-order">
                <span className="icon">&gt;</span>
                <span className='btnText'>Orders</span>
              </Link>

            </div>
            {/* social media */}
            <div className="col-12 col-md-6 col-lg-3 text-center text-lg-start pt-5">
              <h5 style={{ fontFamily: 'fantasy' }}>Social Media</h5>
              {/* <div className="row"> */}
              <span className=' btn  facebook d-inline-block my-2 '><i className="fa-brands  fa-facebook-f"></i></span>
              <span className=' ms-2 btn  d-inline-block pinterest '><i className="fa-brands fa-pinterest-p"></i></span>
              <span className=' ms-2 btn google d-inline-block  '><i className="fa-brands fa-google"></i></span>
              <span className=' ms-2 btn twitter d-inline-block  '><i className="fa-brands fa-twitter"></i></span>
              <p className='pt-2'>Signup and get exclusive offers and coupon codes</p>
              <Link className="zoom-button nav-link " to='/auth/register'>
                Sign Up
                {/* <span className="zoom-overlay"></span> */}
              </Link>

              {/* </div> */}
            </div>
          </div>
          <div className="row mt-5">
            <div className=" mt-lg-4 text-center text-lg-start ">

              <Link to="/privacy" className="col-12 col-md-auto btn darkBtnPrivacy px-0">
                Privacy Policy
              </Link>
              <Link to="/terms" className="col-12 col-md-auto btn darkBtnPrivacy px-lg-3">
                Terms & Conditions
              </Link>

              {/* <div className="col-12 col-md-auto btn darkBtnPrivacy ">Refund Policy</div>
              <div className="col-12 col-md-auto btn darkBtnPrivacy ">Cookie Policy</div> */}
              {/* <div className="col-12 col-md-auto btn darkBtnPrivacy ">Terms & Conditions</div> */}

            </div>


          </div>
          <hr />
          <p className='text-center text-lg-start mb-0 text-white'>Coptright &copy; 2025 . All Right Reserved</p>
        </div>
      </div>

    </>
  )
}
