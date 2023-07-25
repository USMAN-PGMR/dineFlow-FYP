import React from 'react'
import { LiaTelegram } from 'react-icons/lia';


export default function NewsLetter() {
    return (
        <div className="container-fluid newsLetter mt-5 mb-0">
            <div className="container">

                <div className="row py-5">
                    <div className="col-12 col-md-8 col-lg-6 ">
                        <div className="card bg-light px-3 px-lg-5 py-5">
                            <h1 style={{ fontFamily: 'fantasy' }}>
                                Join Our Newsletter
                            </h1>
                            <p className='mt-3 text-secondary' style={{ fontSize: '17px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            <form action="" className='mt-3 mt-md-5'>
                                <input type="email " placeholder='Enter Your Email Address' className='form-control text-secondary py-2' />
                                <div className="col-12 my-2">
                                    <button
                                        className="zoom-button py-3 px-4 bg-danger  fw-semibold mt-3"
                                        style={{ boxShadow: '0 0 25px rgb(255, 168, 168)' }}
                                    >
                                        SUBMIT
                                        <i className='' style={{fontSize:'17px border'}}><LiaTelegram className='ms-2 ' /></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
