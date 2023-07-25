import React from 'react'
import { SplideTrack, Splide, SplideSlide } from '@splidejs/react-splide'
import productData from '../../../config/productData'

export default function LargeSlider() {
  const productSlider=productData;

  return (
    <div className=" largeSlider ">
    <Splide hasTrack={false}
      options={{
        // rewind: true,
        type: 'loop',
        // drag: 'free',
        // snap: true,
        perPage: 1,
        arrows: true,
        pagination: false,
        gap: '2rem',
        // padding:'0 4rem',
        breakpoints: {
          640: {
            arrows: false,
            pagination:true,

            // perPage: 2,
            // gap    : '.7rem',
            // height : '6rem',
          },
          
        },

      }}
      aria-label="My Favorite Images" >
        <SplideTrack>

      {productSlider.map((slide, index) => (
        <SplideSlide key={index}>
          <div className="card bg-light text-center text-md-start my-5 border-0 shadow-sm px-2 px-md-4 container">
            <div className="row">
              <div className="col-12 col-lg-6 px-3 d-flex flex-column justify-content-center text-center text-lg-start">
                <h5 className="text-danger pt-4 pt-md-5" style={{ fontFamily: 'fantasy' }}>
                  {slide.name}
                </h5>
                <h2 className="my-3" style={{ fontFamily: 'fantasy' }}>
                  {slide.title}
                </h2>
                <p className="text-secondary px-3 px-md-5 px-lg-0">{slide.description}</p>
                <div className="col-12 my-4">
                  <button
                    className="zoom-button py-3 px-4 bg-danger fw-semibold mt-4"
                    style={{ boxShadow: '0 0 25px rgb(255, 168, 168)' }}
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-6 text-center text-lg-end pe-lg-4 d-flex flex-column justify-content-center">
                <div className="image-container">
                  <div className="image-wrapper">
                    <img className="py-3 py-lg-0" src={slide.image} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SplideSlide>
        
      ))}
        </SplideTrack>

      <div className="splide__arrows splide__arrows--bottom">
                              <button className="splide__arrow splide__arrow--prev"><i class="fa-solid fa-arrow-left"></i></button>
                              <button className="splide__arrow splide__arrow--next"><i class="fa-solid fa-arrow-right"></i></button>
                          </div>
    </Splide>
  </div>
  )
}
