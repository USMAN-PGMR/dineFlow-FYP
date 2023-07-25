import React from 'react'


import greatOffer from '../../../assets/great-offer.png';           //great offer


export default function Greatoffer() {
  return (
    <>
    <div className="container-fluid bg-light">
          <div className="row">
            <div className="col-12 col-lg-6 d-flex flex-column justify-conyent-center p-5">
              <img className='w-100' src={greatOffer} alt="" />
            </div>
            <div className="col-12 col-lg-6 py-4 d-flex flex-column justify-content-center px-4">
              <h5 className='text-danger' style={{ fontFamily: 'fantasy' }}>Great Offer</h5>
              <h1 style={{ fontFamily: 'fantasy' }}>Buy 1 Get 1 Free</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
              <div className="col-12 my-2">
                <button
                  className="zoom-button py-3 px-4 bg-danger fw-semibold mt-4"
                  style={{ boxShadow: '0 0 25px rgb(255, 168, 168)' }}
                >
                  ORDER NOW
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
