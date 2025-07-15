import React from 'react'
import signature from '../../../assets/signature.png'
import { Link } from 'react-router-dom'
export default function ServingPizza() {
    return (
        <div className="container">
            <div className="row mt-5 py-5">
                <div className="col-12 col-lg-6 px-lg-4 ">
                    <div className="card aboutBack h-100 border-0">

                    </div>
                </div>
                <div className="col-12 col-lg-6 py-5 px-4">
                    <h5 className='text-danger py-2' style={{ fontFamily: 'fantasy' }}>Sir Slice's Heritage</h5>
                    <h1 className='py-2' style={{ fontFamily: 'fantasy' }}>Serving Pizzas By The Slice Since 1987</h1>
                    <p className='text-secondary' style={{ fontSize: '18px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p className='text-secondary' style={{ fontSize: '18px' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div className="row py-2">
                        <img className='w-auto img-fluid' src={signature} alt="signature" />
                    </div>
                    <div className="row pb-5 ">
                        <Link to='/allProducts' className="zoom-button nav-link w-auto px-3 px-lg-4 ms-2  py-3 bg-danger fw-semibold mt-3" style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                            CHECK OUR MENU
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
