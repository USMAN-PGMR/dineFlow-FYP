import React from 'react'
import logo from '../../../assets/logofooter.png'
export default function Footer() {
  return (
    <><div className="footer bg-light ">
      <div className="container py-5">
        <div className="row pt-4">
          <div className="col-12 col-md-6 text-center text-lg-start">
            <img src={logo} alt="" />
          </div>
          <div className="col-12 col-md-6 text-center text-lg-end mt-md-3  ">
            <img className='btn w-25 mx-0 px-0 mt-1' src="http://androthemes.com/themes/react/slices/assets/img/android.png" alt="" />
            <img className='btn w-25 mx-0 px-0 mt-1' src="http://androthemes.com/themes/react/slices/assets/img/ios.png" alt="" />
          </div>
        </div>
        <div className="row mt-md-4 ">
          {/* information */}
          <div className="col-12 col-md-6 col-lg-3 text-center text-lg-start pt-5">
            <h5 style={{ fontFamily: 'fantasy' }}>Information</h5>
            <button className="col-12 mt-2 custom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>Home</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>Blog</span>
            </button>
            <button className=" col-12 mt-2 custom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>About Us</span>
            </button>
            <button className="col-12 mt-2 custom-button  text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Menu</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Contact Us</span>
            </button>

          </div>
          {/* top Items */}
          <div className="col-12 col-md-6 col-lg-3 text-center text-lg-start pt-5">
            <h5 style={{ fontFamily: 'fantasy' }}>Top Items</h5>
            <button className="col-12 mt-2 custom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Peperoni</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Swiss Mushroom</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>Barbeque Chicken</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Vegetarian</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>Harm & Cheese</span>
            </button>
          </div>
          {/* others */}
          <div className="col-12 col-md-6 col-lg-3 text-center text-lg-start pt-5">
            <h5 style={{ fontFamily: 'fantasy' }}>Others</h5>
            <button className="col-12 mt-2 custom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Checkout</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Cart</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>Product</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start">
              <span className="icon">&gt;</span>
              <span className='btnText'>Locations</span>
            </button>
            <button className="col-12 mt-2 custom-button text-center text-lg-start ">
              <span className="icon">&gt;</span>
              <span className='btnText'>Legal</span>
            </button>
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
            <button className="zoom-button ">
              Sign Up
              {/* <span className="zoom-overlay"></span> */}
            </button>

            {/* </div> */}
          </div>
        </div>
        <div className="row mt-5">
          <div className="col mt-lg-4 text-center text-lg-start ">

            <div className="col-12 col-md-auto  btn btnPrivacy px-0">Privacy Policy</div>
            <div className="col-12 col-md-auto btn btnPrivacy ">Refund Policy</div>
            <div className="col-12 col-md-auto btn btnPrivacy ">Cookie Policy</div>
            <div className="col-12 col-md-auto btn btnPrivacy ">Terms & Conditions</div>

          </div>
          {/* <div className="col-12 px-0 mx-0 col-lg-2 text-center text-lg-start">
          </div>
          <div className="col-12 col-lg-2 text-center text-lg-start">
          <div className="btn">Privacy Policy</div>
          </div>
          <div className="col-12 col-lg-2 text-center text-lg-start">
          <div className="btn">Privacy Policy</div>
          </div>
          <div className="col-12 col-lg-2 text-center text-lg-start">
          <div className="btn">Privacy Policy</div>
          </div> */}

        </div>
        <hr />
        <p className='text-center text-lg-start mb-0' style={{ color: '#313131e3' }}>Coptright &copy; 2025 . All Right Reserved</p>
      </div>
    </div>
    </>
  )
}
