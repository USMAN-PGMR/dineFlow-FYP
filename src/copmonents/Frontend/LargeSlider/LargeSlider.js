import React, { useEffect, useState } from 'react';
import { SplideTrack, Splide, SplideSlide } from '@splidejs/react-splide';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { CartState } from '../../../context/CartContext';

export default function LargeSlider() {
  const { state: { cart }, dispatch } = CartState();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'Products'), where('status', '==', 'active')),
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(fetchedProducts);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="largeSlider">
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        </div>
      ) : (
        <Splide
          hasTrack={false}
          options={{
            type: 'loop',
            perPage: 1,
            arrows: true,
            pagination: false,
            gap: '2rem',
            breakpoints: {
              640: {
                arrows: false,
                pagination: true,
              }
            }
          }}
          aria-label="Large Slider Products"
        >
          <SplideTrack>
            {products.map((product, index) => {
              const originalPrice = product.price || 0;
              const discountAmount = product.discount || 0;
              const finalPrice = originalPrice - discountAmount;

              return (
                <SplideSlide key={product.id}>
                  <div className="card bg-light text-center text-md-start my-5 border-0 shadow-sm px-2 px-md-4 container">
                    <div className="row">
                      <div className="col-12 col-lg-6 px-3 d-flex flex-column justify-content-center text-center text-lg-start">
                        <h5 className="text-danger pt-4 pt-md-5" style={{ fontFamily: 'fantasy' }}>{product.type}</h5>
                        <h2 className="my-3" style={{ fontFamily: 'fantasy' }}>{product.title}</h2>
                        <p className="text-secondary px-3 px-md-5 px-lg-0">{product.description}</p>

                        <div className="gap-3 my-2 text-center text-md-start">
                          {discountAmount > 0 ? (
                            <>
                              <span className="text-muted m-0" style={{ textDecoration: 'line-through' }}>
                                Rs {originalPrice}
                              </span>
                              <span className="ps-3 w-25 text-center text-success fw-bold">
                                {Math.round((discountAmount / originalPrice) * 100)}% OFF
                              </span>
                              <h5 className="text-danger m-0 fw-bold">
                                Rs {finalPrice}
                              </h5>
                            </>
                          ) : (
                            <h5 className="text-danger m-0 fw-bold">
                              Rs {originalPrice}
                            </h5>
                          )}
                        </div>

                        <div className="col-12 my-4">
                          {
                            cart.some(p => p.id === product.id) ? (
                              <button
                                className="zoom-button py-3 px-4 fw-semibold"
                                style={{ boxShadow: '0 0 25px rgb(255, 168, 168)', backgroundColor: '#ff477e' }}
                                onClick={() =>
                                  dispatch({ type: "REMOVE_FROM_CART", payload: { ...product, price: finalPrice } })
                                }
                              >
                                Remove <i className="fa-solid fa-cart-shopping ps-1"></i>
                              </button>
                            ) : (
                              <button
                                className="zoom-button py-3 px-4 bg-danger fw-semibold"
                                style={{ boxShadow: '0 0 25px rgb(255, 168, 168)' }}
                                onClick={() =>
                                  dispatch({ type: "ADD_TO_CART", payload: { ...product, price: finalPrice } })
                                }
                              >
                                Add To Cart <i className="fa-solid fa-cart-shopping ps-1"></i>
                              </button>
                            )
                          }
                        </div>
                      </div>

                      <div className="col-12 col-lg-6 text-center text-lg-end pe-lg-4 d-flex flex-column justify-content-center">
                        <div className="image-container">
                          <div className="image-wrapper">
                            <img className="py-3 py-lg-0 img-fluid" src={product.image} alt={product.title} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              );
            })}

          </SplideTrack>

          <div className="splide__arrows splide__arrows--bottom">
            <button className="splide__arrow splide__arrow--prev"><i className="fa-solid fa-arrow-left"></i></button>
            <button className="splide__arrow splide__arrow--next"><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </Splide>
      )}
    </div>
  );
}
