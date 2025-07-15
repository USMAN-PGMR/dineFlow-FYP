import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

export default function Testimonial() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'Testimonials'));
            const fetchedData = querySnapshot.docs.map((doc) => doc.data());
            setTestimonials(fetchedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    return (
        <>
            <div className="container-fluid mt-5 py-5 ">
                <div className="row">
                    <div className="col-12 text-center ">
                        <h5 className='text-danger pt-1' style={{ fontFamily: 'fantasy' }}>Our Backbone</h5>
                        <h1 className='pt-1' style={{ fontFamily: 'fantasy' }}>Customer Testimonials</h1>
                    </div>
                    <div className="col-md-6 offset-md-3 text-center mt-2">
                        <p className='text-secondary'>
                            We deeply value the feedback of our customers. Here's what some of them have to say about their experience with our service, team, and overall journey with us.
                        </p>

                    </div>
                </div>

                {loading ? (
                    <div className="text-center mt-5">
                        <div className="spinner-border"></div>
                    </div>
                ) : (
                    <div className="row mt-2">
                        <div className="col">
                            <div className="testimonials py-4">
                                <Splide hasTrack={false}
                                    options={{
                                        type: 'loop',
                                        perMove: 1,
                                        perPage: 3,
                                        arrows: true,
                                        pagination: false,
                                        gap: '2rem',
                                        breakpoints: {
                                            990: { perPage: 2 },
                                            630: { autoplay: true, perPage: 1 },
                                        },
                                    }}
                                    aria-label="Testimonials">
                                    <SplideTrack>
                                        {testimonials.map((testimonial, index) => (
                                            <SplideSlide key={index}>
                                                <div className="card mt-5 bg-light pt-4 px-2 px-lg-4 border-0 shadow-sm text-center container">
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="image-wrapper">
                                                                <img
                                                                    className="rounded-circle img-fluid mb-0"
                                                                    src={testimonial.image}
                                                                    alt={testimonial.name}
                                                                //   style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-4">
                                                        <span className='text-warning' style={{ fontSize: '23px' }}>
                                                            <BiSolidQuoteAltLeft />
                                                        </span>
                                                    </div>
                                                    <div className="row pt-2">
                                                        <p style={{
                                                            maxHeight: '7.5em',
                                                            minHeight: '7.5em',
                                                            overflowY: 'auto',
                                                            lineHeight: '1.5em',
                                                            textOverflow: 'ellipsis',
                                                            paddingRight: '5px'
                                                        }}>
                                                            {testimonial.message}
                                                        </p>


                                                        <h5 className='pt-2' style={{ fontFamily: 'fantasy' }}>{testimonial.name}</h5>
                                                        <p className='text-secondary fw-semibold'>{testimonial.title}</p>
                                                    </div>
                                                </div>
                                            </SplideSlide>
                                        ))}
                                    </SplideTrack>

                                    <div className="splide__arrows splide__arrows--bottom">
                                        <button className="splide__arrow splide__arrow--prev">
                                            <i className="fa-solid fa-arrow-left"></i>
                                        </button>
                                        <button className="splide__arrow splide__arrow--next">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </Splide>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
