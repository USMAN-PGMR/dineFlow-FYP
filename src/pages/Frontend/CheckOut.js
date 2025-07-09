import React, {  useContext, useState } from 'react'
import TopBar from '../../copmonents/Frontend/TopBar/TopBar'
import AboutHeader from '../../copmonents/Frontend/AboutHeader/AboutHeader'
import { Link,  useNavigate } from 'react-router-dom'
import { Table, Tbody, Td, Th, Thead, Tr, } from 'react-super-responsive-table'
import DarkFooter from '../../copmonents/Frontend/DarkFooter/DarkFooter'
import { CartState } from '../../context/CartContext'
import { firestore } from '../../config/firebase'
import { addDoc, collection,  serverTimestamp,  } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext'
// import firebase from 'firebase/app';



export default function CheckOut() {
  const [isProcessing, setisProcessing] = useState(false)
  const { user } = useContext(AuthContext);
  const { state: { cart }, dispatch } = CartState();
  // console.log('cart', cart)
  const navigate = useNavigate();

const handleConfirmClick = async () => {
  setisProcessing(true);
  try {
    // Prepare the cart data for saving
    const cartData = cart.map((item) => ({
      
      dateSended: new Date(),
      status: 'pending',
      email: user.email,
      type: item.type,
      title: item.title,
      name: item.name, // Ensure you are including the correct property for the item name
      price: item.price,
      qty: item.qty,
      total: calculateTotalPrice(item),
      grandTotal: cartTotal.total,
    }));

    // Save the cart data to Firestore using addDoc
    await addDoc(collection(firestore, 'carts'), {userUid:user.uid,dateSended:serverTimestamp(), items: cartData });

    dispatch({ type: 'ORDERED' });
    window.toastify('Your Order is successfully Sent', 'success');
    navigate('/');
  } catch (err) {
    console.error(err);
    window.toastify("Something went wrong! Order isn't sent", 'error');
  }
  setisProcessing(false);
};

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
  return (
    <>
      {/* header + heroSection */}
      <div className="aboutHero text-white">

        <TopBar />
        <AboutHeader />
        <div className="container pt-5 mt-5">
          <div className="row pt-5 pb-3 ">
            <div className="col mt-lg-5 pt-lg-5">
              <h1 style={{ fontFamily: 'fantasy' }}>Check Out</h1>
              <h6 className='py-2 '><Link to='/' style={{ color: 'white', outline: 'none', textDecoration: 'none' }} >Home</Link> / Check Out</h6>
            </div>
          </div>
        </div>
      </div>
      {/* main */}
      <div className="container my-5 ">
        <div className="row mt-4">
          <div className="col-12 col-lg-8">
            <div className="row ">
              <div className="col mx-1 bg-light pt-4   pb-2 rounded">

                <p className='fw-semibold ps-lg-3' >Are you a returning customer? <Link to='/auth/login' className='text-danger' style={{ outline: 'none', textDecoration: 'none' }} >Click here to login</Link></p>
              </div>
            </div>
            <form action="">

              <div className="row pt-3 ">
                <div className="col-12 col-lg-6">
                  <label for="email" className='fw-semibold py-2'>Email Address</label>
                  <input type="email" name='email' className='form-control py-2' placeholder='Email adress' />
                </div>
                <div className="col-12 col-lg-6">
                  <label for="password" className='fw-semibold py-2'>Password</label>
                  <input type="password" name='password' className='form-control py-2' placeholder='Password' />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">

                  <input type="checkbox" id="remember" name="remember" />
                  <label for="remember" className='ps-2 fw-semibold'> Remember Me</label>
                </div>
                <div className="col-12 mt-2">
                  <button className="zoom-button w-auto  py-2 bg-danger fw-semibold mt-3" style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                    LOGIN
                  </button>
                </div>

              </div>
            </form>
            <div className="row">
              <div className="col mx-1 bg-light pt-4 mt-5  pb-2 rounded">

                <p className='fw-semibold ps-lg-3' >Do you have a coupon code? <Link to='' className='text-danger' style={{ outline: 'none', textDecoration: 'none' }} >Click here to apply</Link></p>
              </div>
            </div>
            <div className="row py-4 mt-1">
              <div className="col">
                <h4 style={{ fontFamily: 'fantasy' }}>Billing Details</h4>
              </div>
              <form action="">
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="firstName" className='fw-semibold py-2'>First Name</label>
                    <input type="text" name='firstName' className='form-control py-2' placeholder='First Name' />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="lastName" className='fw-semibold py-2'>Last Name</label>
                    <input type="text" name='lastName' className='form-control py-2' placeholder='Last Name' />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-12">
                    <label for="companyName" className='fw-semibold py-2'>Company Name</label>
                    <input type="text" name='companyName' className='form-control py-2' placeholder='Company Name (optional)' />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-12">
                    <label for="country" className='fw-semibold py-2'>Country</label>
                    <select name="country " className='form-control py-2' >
                      <option value="none">select the country</option>
                      <option value="Country 1">Country 1</option>
                      <option value="Country 2">Country 2</option>
                      <option value="Country 3">Country 3</option>
                    </select>
                  </div>
                </div>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="Street Adress 1" className='fw-semibold py-2'>Street Adress 1</label>
                    <input type="text" name='Street Adress 1' className='form-control py-2' placeholder='Street Adress 1' />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="Street Adress 1" className='fw-semibold py-2'>Street Adress 2</label>
                    <input type="text" name='Street Adress 1' className='form-control py-2' placeholder='Street Adress 2' />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-12">
                    <label for="TownCity" className='fw-semibold py-2'>Town / City</label>
                    <input type="text" name='TownCity' className='form-control py-2' placeholder='Town / City' />
                  </div>
                </div>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="PhoneNumber" className='fw-semibold py-2'>Phone Number</label>
                    <input type="phone" name='PhoneNumber' className='form-control py-2' placeholder='Phone Number' />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="email" className='fw-semibold py-2'>Email Adress</label>
                    <input type="email" name='email' className='form-control py-2' placeholder='Email Adress' />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-12">
                    <label for="orderNotes" className='fw-semibold py-2'>Order Notes</label>
                    <textarea rows='5' type="text" name='orderNotes' className='form-control py-2' placeholder='Order Notes (optional)' />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-lg-4 ">
            <div className="row">
              <div className="col-12">

                <Table className="table custom-table">
                  <Thead className='bg-dark'>
                    <Tr>
                      {/* <Th scope="col">#</Th> */}
                      <Th colspan="" scope="col">Product</Th>
                      <Th scope="col">Qunantity</Th>
                      <Th scope="col">Total</Th>
                    </Tr>
                  </Thead>
                  {cart.map((item, i) => (
                    <Tbody key={i} >

                      <Tr  >
                        {/* <Th scope="row">1</Th> */}
                        <Td colspan="" className=''  >
                          <h6 style={{ fontFamily: 'fantasy' }}>{item.type}</h6>
                          <span className='d-inline-block '>
                            {item.title}
                            {/* <p>tytytyt</p> */}
                          </span>
                        </Td>


                        {/* <Td colspan="1">3</Td> */}
                        <Td className='my-auto py-auto'>x{item.qty}</Td>

                        <Td className=''>{calculateTotalPrice(item)}$</Td>
                        {/* <Td className='pt-5'>@mdo</Td> */}
                        {/* <Td>@mdo</Td>
                    <Td>@mdo</Td> */}
                      </Tr>
                    </Tbody>


                  ))}

                  <Thead className="bg-dark">
                    <Tr>
                      <Th colSpan="2" className="ps-3">Grand Total</Th>
                      <Th className="ps-3">{cartTotal.total}$</Th>
                    </Tr>
                  </Thead>
                </Table>
              </div>

            </div>
            {/* <div className="row">
              <div className="col-12"> */}
            <div className="row pt-2">
              <div className="col-12">
                <label for="card" className='fw-semibold py-2'>Card Number</label>
                <input type="number" name='card' className='form-control py-2' placeholder='Card Number' />
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-12">
                <label for="fullName" className='fw-semibold py-2'>Full Name</label>
                <input type="text" name='fullName' className='form-control py-2' placeholder='Full Name' />
              </div>
            </div>
            <div className="row pt-2 ">
              <div className="col-12 col-lg-6">
                <label for="date" className='fw-semibold py-2'>Expiry Date</label>
                <input type="date" name='date' className='form-control py-2' placeholder='Expiry Date' />
              </div>
              <div className="col-12 col-lg-6 pt-2 pt-lg-0">
                <label for="CVV+" className='fw-semibold py-2'>CVV+</label>
                <input type="number" name='lastName' className='form-control py-2' placeholder='0' />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col">
                <p style={{ fontSize: '10px' }}>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
              </div>
            </div>
            <div className="row pt-2">
              <div className="col">
                <button className="zoom-button w-100  py-3 bg-danger fw-semibold border-0 " data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                  PLACE ORDER
                </button>
                {/* modal */}
                <div className="modal  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-4  text-success" id="exampleModalLabel">ARE YOU SURE!</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body py-4">
                      <Table className="table ">
                  <Thead className='bg-dark'>
                    <Tr>
                      {/* <Th scope="col">#</Th> */}
                      <Th colspan="" scope="col">Product</Th>
                      <Th scope="col">Qunantity</Th>
                      <Th scope="col">Total</Th>
                    </Tr>
                  </Thead>
                  {cart.map((item, i) => (
                    <Tbody key={i} >

                      <Tr  >
                        {/* <Th scope="row">1</Th> */}
                        <Td colspan="" className=''  >
                          <h6 style={{ fontFamily: 'fantasy' }}>{item.type}</h6>
                          <span className='d-inline-block '>
                            {item.title}
                            {/* <p>tytytyt</p> */}
                          </span>
                        </Td>


                        {/* <Td colspan="1">3</Td> */}
                        <Td className='my-auto py-auto'>x{item.qty}</Td>

                        <Td className=''>{calculateTotalPrice(item)}$</Td>
                        {/* <Td className='pt-5'>@mdo</Td> */}
                        {/* <Td>@mdo</Td>
                    <Td>@mdo</Td> */}
                      </Tr>
                    </Tbody>


                  ))}

                  <Thead className="bg-dark">
                    <Tr>
                      <Th colSpan="2" className="ps-3">Grand Total</Th>
                      <Th className="ps-3">{cartTotal.total}$</Th>
                    </Tr>
                  </Thead>
                </Table>
                      
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button className='btn btn-success ' data-bs-dismiss="modal"  onClick={handleConfirmClick} disabled={isProcessing}>
                    {!isProcessing ? "Confirm" : <div className='spinner spinner-border mx-3 spinner-border-sm'></div>}

                  </button> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* footer */}

      <DarkFooter />
    </>
  )
}
