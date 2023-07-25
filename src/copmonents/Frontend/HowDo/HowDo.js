import React from 'react'

export default function HowDo() {
  return (
    <div className="container mt-5 pt-4">
          <div className="row">
            <div className="col-12 text-center ">
              <h5 className='text-danger pt-1' style={{ fontFamily: 'fantasy' }}>How We Do It</h5>
              <h1 className='pt-1' style={{ fontFamily: 'fantasy' }}>We Deliver Your Food In 4 Steps</h1>

            </div>
            <div className="col-md-6 offset-md-3 text-center mt-2">
              <p className='text-secondary'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 mt-3 mt-md-0 col-md-6 col-lg-3 text-center  ">
              {/* <RiComputerLine /> */}
              <i style={{ fontSize: '50px' }} className="fa-solid fa-computer my-3 text-danger "></i>
              <h4 style={{ fontFamily: 'fantasy' }}>Order</h4>
              <p className='text-secondary px-2'>There are many variations of passages of Lorem Ipsum available</p>

            </div>
            <div className="col-12 mt-3 mt-lg-0 col-md-6 col-lg-3 text-center  ">
              {/* <RiComputerLine /> */}
              <i style={{ fontSize: '50px' }} className="fa-solid fa-fire-flame-curved my-3 text-danger "></i>
              <h4 style={{ fontFamily: 'fantasy' }}>Cook</h4>
              <p className='text-secondary px-2'>There are many variations of passages of Lorem Ipsum available</p>

            </div>
            <div className="col-12 mt-3 mt-lg-0 col-md-6 col-lg-3 text-center  ">
              {/* <RiComputerLine /> */}
              <i style={{ fontSize: '50px' }} className="fa-solid fa-truck my-3 text-danger "></i>
              <h4 style={{ fontFamily: 'fantasy' }}>Deliver</h4>
              <p className='text-secondary'>There are many variations of passages of Lorem Ipsum available</p>

            </div>
            <div className="col-12 mt-3 mt-lg-0 col-md-6 col-lg-3 text-center  ">
              {/* <RiComputerLine /> */}
              <i style={{ fontSize: '50px' }} className="fa-solid fa-bowl-food my-3 text-danger "></i>
              <h4 style={{ fontFamily: 'fantasy' }}>Enjoy</h4>
              <p className='text-secondary'>There are many variations of passages of Lorem Ipsum available</p>

            </div>
            <div className="col-12 text-center">
              <button className=" zoom-button  py-3 px-4 bg-danger fw-semibold mt-4  " style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                ORDER ONLINE
                {/* <span className="zoom-overlay"></span> */}
              </button>
            </div>
          </div>
        </div>
  )
}
