import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import TopBar from '../../copmonents/Frontend/TopBar/TopBar'
import AboutHeader from '../../copmonents/Frontend/AboutHeader/AboutHeader'
import { Link } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import DarkFooter from '../../copmonents/Frontend/DarkFooter/DarkFooter';
import { CartState } from '../../context/CartContext';

export default function Cart() {
    const { state: { cart }, dispatch } = CartState();

    // --------function to handle the calculations----------
    const taxRate = 0.07; // Assuming tax rate is 7%, change it accordingly

    const calculateTotalPrice = (item) => {
        return (item.price * item.qty).toFixed(2);
    };

    const calculateCartTotal = () => {
        let subtotal = 0;
        cart.forEach((item) => {
            subtotal += parseFloat(calculateTotalPrice(item));
        });

        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
        };
    };

    const cartTotal = calculateCartTotal();
    // ----------------------

    return (
        <>
            {/* header */}
            <div className="aboutHero text-white">

                <TopBar />
                <AboutHeader />
                <div className="container pt-5 mt-5">
                    <div className="row pt-5 pb-3 ">
                        <div className="col mt-lg-5 pt-lg-5">
                            <h1 style={{ fontFamily: 'fantasy' }}>Cart</h1>
                            <h6 className='py-2 '><Link style={{ color: 'white', outline: 'none', textDecoration:'none' }} to='/'> Home</Link> / Cart</h6>
                        </div>
                    </div>
                </div>
            </div>
            {/* main */}
            <div className="container my-5">
                <div className="row pt-5">
                    <div className="col">
                        <Table className="table custom-table">
                            <Thead className='bg-dark'>
                                <Tr>
                                    <Th scope="col"  > <span className=' d-lg-none'>Action</span>  </Th>
                                    <Th colspan="" scope="col">Product</Th>
                                    <Th scope="col">Price</Th>
                                    <Th scope="col">Quantity</Th>
                                    <Th scope="col">Total</Th>
                                </Tr>
                            </Thead>
                                {cart.length>0?(
                            <Tbody >

                                    {cart.map((item, index) => (
                                        <Tr key={index}>
                                        <Td>

                                            <ImCross style={{ cursor: 'pointer' }} className="ms-3 mt-2 text-danger border-0 outnine-0" onClick={() => {
                                                dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: item,
                                                })
                                            }} />
                                            {/* </span> */}
                                        </Td>
                                        <Td colspan="" className="  ">
                                            <div className="row">
                                                <div className="col-12 col-md-2   px-0 ">
                                                <img
                                                src={item.image}
                                                alt=""
                                                style={{ width: '40px', height: '40px' }}
                                                className="img-fluid  ms-2   circular"
                                            />
                                                </div>
                                                <div className="col-12 col-md-10 px-0 ">
                                                <div className="   pb-0">
                                                <h6 className=' mb-0' style={{fontFamily:'fantasy'}}>{item.type}</h6>
                                                <p className=' my-0'>{item.name}</p>
                                                </div>
                                                </div>
                                                </div>
                                                
                                                
                                                
                                                </Td>
                                                <Td className="my-auto">{item.price}$</Td>
                                                
                                                <Td className="">
                                                <div className="qty">
                                                <span className="qty-subtract" onClick={() => dispatch({ type: "DECREMENT", payload: { id: item.id } })}><i class="fa-solid fa-minus"></i></span>
                                                <input type="number" className='ps-2 ps-lg-3' readOnly value={item.qty} name="clicks"
                                                onChange={(e) =>
                                                    dispatch({
                                                        type: "CHANGE_QTY",
                                                        payload: {
                                                            id: item.id,
                                                            qty: e.target.value,
                                                        }
                                                    })
                                                }
                                                />
                                                <span className="qty-add" onClick={() => dispatch({ type: "INCREMENT", payload: { id: item.id } })}><i class="fa-solid fa-plus"></i></span>
                                                </div>
                                                </Td>
                                                <Td className="TOTAL">{calculateTotalPrice(item)}$</Td>
                                                </Tr>
                                                ))}

                            </Tbody>
                                                ):(
                                                    <Tbody>
                                                        <Tr className="text-center border">
                                                            <Td colSpan="5">

                                                        <p className='text-center pt-2'>Your Cart is Empty</p>
                                                            </Td>
                                                        </Tr>

                                                 </Tbody>
                                                )}
                        </Table>
                    </div>
                </div>
                <div className="row mt-5 pt-5">
                    <div className="col-lg-6">

                    </div>
                    <div className="col-12 col-lg-6">
                        <h3 style={{ fontFamily: 'fantasy' }} >Cart Total</h3>
                        <div className="row">
                            <div className="col-4 bg-dark text-white pt-3">
                                <h6 style={{ fontFamily: 'fantasy' }}>Subject</h6>
                                <hr />
                                <h6 style={{ fontFamily: 'fantasy' }}>Tax</h6>
                                <hr />
                                <h6 style={{ fontFamily: 'fantasy' }}>Total</h6>
                                {/* <hr className='pb-0 mb-0' /> */}
                            </div>
                            <div className="col-8 bg-light  pt-3">
                                <p className='SUBJECT' >{cartTotal.subtotal}$</p>
                                <hr />
                                <p className='TEX' >{cartTotal.tax}$</p>
                                <hr />
                                <h6 className='CART_TOTAL' style={{ fontFamily: 'fantasy' }}>{cartTotal.total}$</h6>
                                {/* <hr className='pb-0 mb-0' /> */}
                            </div>
                            <div className="col-12 my-4">
                                <Link to='/checkout' className="zoom-button w-100 text-center    py-3 bg-danger fw-semibold mt-3" style={{ boxShadow: "0 0 25px rgb(255, 168, 168)", outline: 'none', textDecoration: 'none' }}>
                                    PROCEED TO CHECKOUT
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <DarkFooter />
        </>
    )
}
