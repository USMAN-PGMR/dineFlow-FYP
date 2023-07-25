import React from 'react'
import image1 from '../../../assets/1 (1).jpg';
import image2 from '../../../assets/2 (1).jpg';
import image3 from '../../../assets/3 (1).png';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

export default function HeroSection() {
    return (
        <div className=" " >


            <div className=" sliders ">
                <Splide
                    options={{
                        // rewind: true,
                        // type: 'loop',
                        // drag: 'free',
                        gap:'2rem',
                        type: 'loop',
                        // snap: true,
                        perPage: 1,
                        arrows: false,
                        pagination: true,
                        breakpoints: {
                            990: {
                                autoplay: true,
                  
                            },
                           
                          },
                  

                    }}
                    aria-label="My Favorite Images" >
                    <SplideSlide>

                        <div className="row  " >
                            <div className="col-12 col-lg-5  heroImg1 " >
                                <div className="d-block d-lg-none text-white text-center">
                                    <div className="row px-3 py-5 mb-3">
                                        <h1 style={{ fontFamily: 'fantasy', fontSize: '35px' }} className="title pt-5">Italian Pizza Never Got Any <br className='d-block d-md-none' /> Better</h1>
                                        <h5 className='py-2' style={{ fontFamily: 'fantasy' }}>It is the cheese that lures us into eating</h5>
                                        <p className=''>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ipsam ipsa in voluptate odio tempore! Quia facilis nobis rerum porro. Dicta molestias, vel iure ipsum neque quo ex est nemo.</p>
                                        <div className="text-center">
                                            <button className="zoom-button w-auto px-4 px-md-5  py-3 bg-danger fw-semibold mt-3" style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                                                VIEW MENU
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="d-none d-lg-block col-lg-7   bg-light text-start   " >
                                <div className="row px-3  pt-5 mt-5 text-start">
                                    <h1  style={{ fontFamily: 'fantasy', fontSize: '60px', }} className="title text-start pt-5 ">Italian Pizza Never Got <br /> Any Better</h1>
                                    <h4 className='py-2' style={{ fontFamily: 'fantasy' }}>It is the cheese that lures us into eating</h4>
                                    <p className='text-secondary me-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ipsam ipsa in voluptate odio tempore! Quia facilis nobis rerum porro. Dicta molestias, vel iure ipsum neque quo ex est nemo.</p>
                                    <div className="col-3 ">
                                        <button className="zoom-button w-100 py-3 bg-danger fw-semibold mt-3  " style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                                            VIEW MENU
                                            {/* <span className="zoom-overlay"></span> */}
                                        </button>

                                    </div>

                                </div>
                                <div className="row ">
                                    <div className="col-12 fixed text-end pe-4 pb-0 ">

                                        <img className='' src={image3} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>

                        <div className="row  " >
                            <div className="col-12 col-lg-5  heroImg2 " >
                                <div className="d-block d-lg-none text-white text-center">
                                    <div className="row px-3 py-5 mb-3">
                                        <h1 style={{ fontFamily: 'fantasy', fontSize: '35px' }} className="title pt-5">Celebrating 100 Years of Cheesy <br className='d-block d-md-none' /> Pizza</h1>
                                        <h5 className='py-2' style={{ fontFamily: 'fantasy' }}>Join our grand opening tonight for free pizza</h5>
                                        <p className=''>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ipsam ipsa in voluptate odio tempore! Quia facilis nobis rerum porro. Dicta molestias, vel iure ipsum neque quo ex est nemo.</p>
                                        <div className="text-center">
                                            <button className="zoom-button w-auto px-4 px-md-5  py-3 bg-danger fw-semibold mt-3" style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                                                VIEW MENU
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="d-none d-lg-block col-lg-7   bg-light   " >
                                <div className="row px-3  pt-5 mt-5 ">
                                    <h1 style={{ fontFamily: 'fantasy', fontSize: '60px', }} className="title pt-5 ">Celebrating 100 Years of Cheesy Pizza</h1>
                                    <h4 className='py-2' style={{ fontFamily: 'fantasy' }}>Join our grand opening tonight for free pizza</h4>
                                    <p className='text-secondary me-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ipsam ipsa in voluptate odio tempore! Quia facilis nobis rerum porro. Dicta molestias, vel iure ipsum neque quo ex est nemo.</p>
                                    <div className="col-3 ">
                                        <button className="zoom-button w-100 py-3 bg-danger fw-semibold mt-3  " style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                                            VIEW MENU
                                            {/* <span className="zoom-overlay"></span> */}
                                        </button>

                                    </div>

                                </div>
                                <div className="row ">
                                    <div className="col-12 fixed text-end pe-4 pb-0 ">

                                        <img className='' src={image3} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SplideSlide>
                    
                   
                </Splide>
            </div>
        </div>
    )
}
