import React from 'react'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';

// images
import testimonial1 from '../../../assets/newsLetter1.jpg';
import testimonial2 from '../../../assets/testimonial-2.jpg';
import testimonial3 from '../../../assets/testimonial-3.jpg';
import testimonial4 from '../../../assets/testimonial-4.jpg';


// data
// Newsletters
const newsLetters = [
    {
        img: testimonial1,
        discription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        name: "John Doe",
        profession: "Food Specialist",
    },
    {
        img: testimonial2,
        discription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        name: "Heather Medlin",
        profession: "Food Specialist",
    },
    {
        img: testimonial3,
        discription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        name: "Tina Flinston",
        profession: "Food Specialist",
    },
    {
        img: testimonial4,
        discription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        name: "Justine Donawick",
        profession: "Food Specialist",
    },
]
export default function Testimonial() {
    return (
        <>
            {/* testimonial */}
            <div className="container-fluid mt-5 py-5 ">
                <div className="row">
                    <div className="col-12 text-center ">
                        <h5 className='text-danger pt-1' style={{ fontFamily: 'fantasy' }}>Our Backbone</h5>
                        <h1 className='pt-1' style={{ fontFamily: 'fantasy' }}>Customer Testimonials</h1>

                    </div>
                    <div className="col-md-6 offset-md-3 text-center mt-2">
                        <p className='text-secondary'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <div className="testimonials py-4">
                            <Splide hasTrack={false}
                                options={{
                                    // rewind: true,
                                    type: 'loop',
                                    // drag: 'free',
                                    // snap: true,
                                    perMove: 1,
                                    perPage: 3,
                                    arrows: true,
                                    // autoWidth: true,
                                    pagination: false,

                                    gap: '2rem',
                                    breakpoints: {
                                        990: {
                                            // arrows: false,
                                            // padding:'0 2rem',
                                            perPage: 2,
                                            // perPage: 2,
                                            // gap    : '.7rem',
                                            // height : '6rem',
                                        },
                                        630: {
                                            autoplay: true,
                                            // arrows: false,
                                            perPage: 1,
                                            // perPage: 1,
                                            // gap    : '.7rem',
                                            // height : '6rem',
                                        },
                                    },

                                }}
                                aria-label="My Favorite Images" >
                                <SplideTrack>
                                    {newsLetters.map((newsLetter, index) => (

                                        <SplideSlide key={index} >
                                            <div className="card mt-5 bg-light pt-4 px-2 px-lg-4 border-0 shadow-sm text-center container" >
                                                <div className="row">
                                                    <div className="col ">
                                                        {/* <div className="image-container"> */}
                                                        <div className="image-wrapper">
                                                            <img className="rounded-circle img-fluid  mb-0" src={newsLetter.img} alt="" />
                                                        </div>
                                                        {/* </div> */}
                                                    </div>

                                                </div>
                                                <div className="row mt-4">
                                                    <span className='text-warning' style={{ fontSize: '23px' }}><BiSolidQuoteAltLeft /></span>
                                                </div>
                                                <div className="row pt-2 ">
                                                    <p>{newsLetter.discription}</p>
                                                    <h5 className='pt-2' style={{ fontFamily: "fantasy" }}>{newsLetter.name}</h5>
                                                    <p className='text-secondary fw-semibold'>{newsLetter.profession}</p>
                                                </div>
                                            </div>
                                        </SplideSlide>
                                    ))}
                                </SplideTrack>
                                <div className="splide__arrows splide__arrows--bottom ">

                                    <button className="splide__arrow splide__arrow--prev"><i class="fa-solid fa-arrow-left"></i></button>
                                    <button className="splide__arrow splide__arrow--next"><i class="fa-solid fa-arrow-right"></i></button>
                                </div>

                            </Splide>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
