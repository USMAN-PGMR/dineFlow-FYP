import React, { useState, useEffect } from 'react';
import { CartState } from '../../../context/CartContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

// let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

export default function CardsLocal() {
  const {state :{cart},dispatch} = CartState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'Products'), orderBy('dateCreated', 'asc')),
      (querySnapshot) => {
        const productsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsData);
        // setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // let data = state.products
  // console.log('data', products)
  console.log('cart', cart)
  return (
    <>
      <div>
        {products.map((prod) => (
          <div className="flip-card d-inline-block mx-5 my-5" prod={prod}
            key={prod.id}
          >
            <div className="flip-card-inner">
              <div
                className="flip-card-front"
                style={{ backgroundImage: `url(${prod.image})` }}
              >
                <p className="price mt-3">
                  {prod.price}
                  </p>
              </div>
              <div className="flip-card-back">
                <p className="title">
                  {prod.title}
                </p>
                {
                  cart.some(p=>p.id === prod.id)?(

                <div className="btn btn-danger" onClick={()=>{
                  dispatch({
                    type:"REMOVE_FROM_CART",
                    payload:prod,
                  })
                }} >
                  Remove
                </div>
                  ):(

                <div className="btn btn-primary" onClick={()=>{
                  dispatch({
                    type:"ADD_TO_CART",
                    payload:prod,
                  })
                }}
                >
                  ADD
                </div>
                  )
                }
              </div>
            </div>
          </div>
          ))}  
      </div>
    </>
  );
}
