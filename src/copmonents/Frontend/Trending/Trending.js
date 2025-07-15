import { SplideTrack, Splide, SplideSlide } from '@splidejs/react-splide'
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

// import productData from '../../../config/productData';
import { firestore } from '../../../config/firebase';
import { CartState } from '../../../context/CartContext';

// import papperoniPiza from '../../../assets/5-Pepperoni Pizza.png';
export default function Trending() {
  // const productSlider=productData;
  const {state :{cart},dispatch} = CartState();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, 'Products'),
      where('status', '==', 'active'),
      //  orderBy('dateCreated', 'asc')
       ),
      (querySnapshot) => {
        const productsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsData);
        setIsLoading(false);
        // setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  return (
    <div className="container-fluid mt-5 py-5">
      <div className="row">
        <div className="col-12 text-center ">
          <h5 className='text-danger pt-1' style={{ fontFamily: 'fantasy' }}>Trending</h5>
          <h1 className='pt-1' style={{ fontFamily: 'fantasy' }}>Our Customers' Top Picks</h1>

        </div>
        <div className="col-md-6 offset-md-3 text-center mt-2">
          <p className='text-secondary'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
        </div>
      </div>
      {isLoading ? (
       <div className="text-center">
       <div className="spinner spinner-grow"></div>
     </div>
      ) : (
      <div className="row mb-5">
        <div className=" trending  ">
          <Splide hasTrack={false}
            options={{
              // rewind: true,
              type: 'loop',
              // drag: 'free',
              // snap: true,
              perPage: 3,
              perMove: 1,
              arrows: true,
              pagination: false,
              gap: '2rem',

              breakpoints: {
                900: {
                  perPage: 2,

                  
                },
                630: {
                  autoplay: true,
                  perPage: 1,
                  // arrows: false,
                },
              },

            }}
            aria-label="My Favorite Images" >
            <SplideTrack>

              {products.map((product, i) => (
              <SplideSlide  >
                <div className="card  border-0 mb-5 bg-transparent text-center " >
                  <img className='img-fluid bg-transparent ' src={product.image} alt="" style={{ width: '80%', margin: '0 auto', position: 'relative', bottom: '-60px', zIndex: '100000000' }} />
                  <div className="card bg-light text-center px-2 px-lg-4 py-5  border-0 shadow-sm  px-2 px-md-4 " >
                    <div className="row pt-4">
                      <h4 style={{ fontFamily: 'fantasy' }}>{product.title}</h4>
                      <p className='trend-descrption'>{product.description}</p>
                      <hr />
                      <div className="row">
                        <div className="col-5 text-start">
                          {/* <div className="card  rounded-5    " > */}
                           <span className='text-start   bg-white rounded-5 py-2 px-4  d-inline-block  ' style={{ boxShadow: '0 0 25px rgb(235, 226, 226)' }}><b className='px-1'>Rs{product.price}</b></span>
                          {/* </div> */}
                        </div>
                        <div className="col-7 text-end ">
                        {
                  cart.some(p=>p.id === product.id)?(

                <button 
                className="zoom-button     py-2 mt-1 mb-0 "
                style={{ boxShadow: '0 0 25px rgb(255, 168, 168)',backgroundColor:'#ff477e' }}
                 onClick={()=>{
                  dispatch({
                    type:"REMOVE_FROM_CART",
                    payload:product,
                  })
                }} >
                  Remove <i class="fa-solid fa-cart-shopping ps-1"></i>
                </button>
                  ):(

                <button  className="zoom-button bg-danger   py-2 mt-1 mb-0 "
                style={{ boxShadow: '0 0 25px rgb(255, 168, 168)' }} 
                onClick={()=>{
                  dispatch({
                    type:"ADD_TO_CART",
                    payload:product,
                  })
                }}
                >
                  ADD <i class="fa-solid fa-cart-shopping ps-1"></i>
                </button>
                  )
                }
                        </div>
                      </div>


                    </div>
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
      )}
    </div>
  )
}
