import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { firestore } from '../config/firebase';
// import productData from '../config/productData';
// import CartReducer from './CartReducer ';

const Cart = createContext();

export default function CartContextProvider({ children }) {
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

    // const products=productData

  const CartReducer=(state,action)=>{
    switch (action.type) {
        case "ADD_TO_CART":
          return {...state,cart:[...state.cart,{...action.payload,qty:1}]}
        case "REMOVE_FROM_CART":
          return {
            ...state,
            cart:state.cart.filter((c)=>c.id !== action.payload.id)
          }
          case "INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      };
    case "DECREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        )
      };
      case "CHANGE_QTY":
        return {
          ...state,
          cart:state.cart.filter((c)=>c.id == action.payload.id?(c.qty=action.payload.qty):c.qty
          ),
        }
        case "ORDERED": // Add the "ORDERED" case to clear the cart after placing an order
        return {
          ...state,
          cart: [],
        };
        default:
           return state;
    }
  }

  // Retrieve cart data from localStorage on initial load
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];


  // console.log('products', products)

  const [state,dispatch]=useReducer(CartReducer,{
    products:products,
    cart:initialCart,
  })
  // Save cart data to localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

// console.log('state =>', state)
// Load cart data from localStorage on component mount



// console.log('state =>', state)
  return (
    <>
      <Cart.Provider value={{state,dispatch}}>{children}</Cart.Provider>
    </>
  );
}


export const CartState = () => {
    return useContext(Cart);
    
  }

// import React, { createContext, useContext, useEffect, useState } from 'react';

// const Cart = createContext();

// export default function CartContextProvider({ children }) {
//   const [products, setProducts] = useState([]);
//   const [state, setState] = useState({
//     products: [],
//     cart: [],
//   });

//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then((res) => res.json())
//       .then((json) => {
//         setProducts(json);
//       });
//   }, []);

//   useEffect(() => {
//     setState((prevState) => ({
//       ...prevState,
//       products: products,
//     }));
//   }, [products]);

//   console.log('state =>', state);

//   return (
//     <Cart.Provider value={{ state, setState }}>{children}</Cart.Provider>
//   );
// }

// export const CartState = () => {
//   const { state } = useContext(Cart);
//   return state ? state : null;
// }
