import React, { useContext, useEffect, useState } from 'react'
import TopBar from '../../copmonents/Frontend/TopBar/TopBar'
import AboutHeader from '../../copmonents/Frontend/AboutHeader/AboutHeader'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Tbody, Td, Th, Thead, Tr, } from 'react-super-responsive-table'
import DarkFooter from '../../copmonents/Frontend/DarkFooter/DarkFooter'
import { CartState } from '../../context/CartContext'
import { firestore, storage } from '../../config/firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext'
// import firebase from 'firebase/app';



export default function CheckOut() {
  // payment-> account info from admin 
  const [accountInfo, setAccountInfo] = useState(null);

  // payment method
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [tid, setTid] = useState("");

  const [isProcessing, setisProcessing] = useState(false)
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    phone: '',
    email: '',
    notes: '',
  });

  const { user } = useContext(AuthContext);
  const { state: { cart }, dispatch } = CartState();
  const {
    firstName,
    lastName,
    companyName,
    country,
    street1,
    street2,
    city,
    phone,
    email,
    notes,
  } = billingDetails;
  // payment-> account info from admin 
  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const docRef = doc(firestore, 'PaymentInfo', 'BankAccount');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAccountInfo(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    fetchAccountInfo();
  }, []);
  // ................

  const generateOrderId = () => {
    const timestamp = Date.now(); // current time in ms
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `ORD-${timestamp}-${random}`;
  };

  // console.log('cart', cart)
  const navigate = useNavigate();

  const handleConfirmClick = async () => {
    setisProcessing(true);

    const {
      firstName, lastName, companyName, country,
      street1, street2, city, phone, email, notes
    } = billingDetails;

    // ✅ Required field check
    if (!firstName.trim() || !lastName.trim() || !country.trim() || !street1.trim() || !city.trim() || !phone.trim()) {
      window.toastify("Please fill all required billing details!", "error");
      setisProcessing(false);
      return;
    }

    // ✅ Easypaisa payment validation
    if (paymentMethod === "easypaisa") {
      if (!paymentScreenshot || !tid.trim()) {
        window.toastify("Please upload screenshot and enter TID!", "error");
        setisProcessing(false);
        return;
      }
    }

    try {
      const orderId = generateOrderId();
      let screenshotURL = null;

      // ✅ Upload Screenshot to Firebase Storage if Easypaisa selected
      if (paymentMethod === "easypaisa" && paymentScreenshot) {
        const fileRef = ref(storage, `paymentScreenshots/${orderId}_${paymentScreenshot.name}`);
        const snapshot = await uploadBytes(fileRef, paymentScreenshot);
        screenshotURL = await getDownloadURL(snapshot.ref); // Get downloadable URL
      }

      const cartData = cart.map((item) => ({
        type: item.type,
        title: item.title,
        name: item.name,
        price: item.price,
        qty: item.qty,
        total: calculateTotalPrice(item),
      }));

      const orderDetails = {
        orderId,
        userUid: user.uid,
        email: user.email,
        dateSended: serverTimestamp(),
        status: "pending",
        items: cartData,
        grandTotal: cartTotal.total,
        billing: {
          firstName, lastName, companyName, country,
          street1, street2, city, phone, email: user.email, notes
        },
        payment: {
          method: paymentMethod,
          tid: paymentMethod === "easypaisa" ? tid : null,
          screenshotURL: screenshotURL || null
        }
      };

      await addDoc(collection(firestore, "carts"), orderDetails);

      dispatch({ type: "ORDERED" });
      window.toastify('Your Order is successfully Sent', 'success');
      document.querySelector('#exampleModal .btn-close')?.click(); // close modal programmatically

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
    return Math.round(item.price * item.qty);
  };

  const calculateCartTotal = () => {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += parseFloat(calculateTotalPrice(item));
    });

    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return {
      subtotal: Math.round(subtotal),   // No decimal
      tax: Math.round(tax),
      total: Math.round(total),
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

            <div className="row  ">
              <div className="col ">
                <h3 style={{ fontFamily: 'fantasy' }}>Billing Details</h3>
              </div>
              <form>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="firstName" className='fw-semibold py-2'>First Name *</label>
                    <input type="text" name='firstName' required className='form-control py-2'
                      placeholder='First Name'
                      value={billingDetails.firstName}
                      onChange={(e) => setBillingDetails({ ...billingDetails, firstName: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="lastName" className='fw-semibold py-2'>Last Name *</label>
                    <input type="text" name='lastName' required className='form-control py-2'
                      placeholder='Last Name'
                      value={billingDetails.lastName}
                      onChange={(e) => setBillingDetails({ ...billingDetails, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="col-12">
                    <label htmlFor="companyName" className='fw-semibold py-2'>Company Name</label>
                    <input type="text" name='companyName' className='form-control py-2'
                      placeholder='Company Name (optional)'
                      value={billingDetails.companyName}
                      onChange={(e) => setBillingDetails({ ...billingDetails, companyName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="col-12">
                    <label htmlFor="country" className='fw-semibold py-2'>Country *</label>
                    <select name="country" required className='form-control py-2'
                      value={billingDetails.country}
                      onChange={(e) => setBillingDetails({ ...billingDetails, country: e.target.value })}
                    >
                      <option value="">Select Country</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Turkey">Turkey</option>
                    </select>
                  </div>
                </div>

                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="street1" className='fw-semibold py-2'>Street Address 1 *</label>
                    <input type="text" name='street1' required className='form-control py-2'
                      placeholder='Street Address 1'
                      value={billingDetails.street1}
                      onChange={(e) => setBillingDetails({ ...billingDetails, street1: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="street2" className='fw-semibold py-2'>Street Address 2</label>
                    <input type="text" name='street2' className='form-control py-2'
                      placeholder='Street Address 2'
                      value={billingDetails.street2}
                      onChange={(e) => setBillingDetails({ ...billingDetails, street2: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="col-12">
                    <label htmlFor="city" className='fw-semibold py-2'>Town / City *</label>
                    <input type="text" name='city' required className='form-control py-2'
                      placeholder='Town / City'
                      value={billingDetails.city}
                      onChange={(e) => setBillingDetails({ ...billingDetails, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="phone" className='fw-semibold py-2'>Phone Number *</label>
                    <input type="tel" name='phone' required className='form-control py-2'
                      placeholder='Phone Number'
                      value={billingDetails.phone}
                      onChange={(e) => setBillingDetails({ ...billingDetails, phone: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="email" className='fw-semibold py-2'>Email Address *</label>
                    <input type="email" name='email' required disabled className='form-control py-2'
                      placeholder='Email Address'
                      value={user.email}
                      onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="col-12">
                    <label htmlFor="notes" className='fw-semibold py-2'>Order Notes</label>
                    <textarea rows='5' name='notes' className='form-control py-2'
                      placeholder='Order Notes (optional)'
                      value={billingDetails.notes}
                      onChange={(e) => setBillingDetails({ ...billingDetails, notes: e.target.value })}
                    />
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

                        <Td className=''>{calculateTotalPrice(item)}</Td>
                        {/* <Td className='pt-5'>@mdo</Td> */}
                        {/* <Td>@mdo</Td>
                    <Td>@mdo</Td> */}
                      </Tr>
                    </Tbody>


                  ))}

                  <Thead className="bg-dark">
                    <Tr>
                      <Th colSpan="2" className="ps-3">Grand Total</Th>
                      <Th className="ps-3">RS {cartTotal.total}</Th>
                    </Tr>
                  </Thead>
                </Table>
              </div>

            </div>
            {/* <div className="row">
              <div className="col-12"> */}
            {/* Payment Method Selection */}
            <div className="row pt-3">
              <div className="col-12">
                <label className='fw-semibold py-2 d-block'>Select Payment Method:</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    Cash on Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="easypaisa"
                    value="easypaisa"
                    checked={paymentMethod === "easypaisa"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="easypaisa">
                    Easypaisa / Jazzcash
                  </label>
                </div>
              </div>
            </div>

            {/* If Easypaisa selected - show payment details card and inputs */}
            {paymentMethod === "easypaisa" && (
              <>
                <div className="row pt-3">
                  <div className="col-12">
                    <div className="card p-3 bg-light shadow-sm">
                      <h6 className="mb-1"><strong>Account Details:</strong></h6>

                      {accountInfo ? (
                        <>
                          <p className="mb-1">Account Title: <strong>{accountInfo.accountTitle}</strong></p>
                          <p className="mb-1">Account Number: <strong>{accountInfo.accountNumber}</strong></p>
                          <p>Type: <strong>{accountInfo.type}</strong></p>
                        </>
                      ) : (
                        <div className="text-muted small">Loading...</div>
                      )}
                    </div>

                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-12">
                    <label htmlFor="screenshot" className='fw-semibold required py-2'>Upload Payment Screenshot</label>
                    <input
                      type="file"
                      name="screenshot"
                      className="form-control py-2"
                      onChange={(e) => setPaymentScreenshot(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-12">
                    <label htmlFor="tid" className='fw-semibold py-2 required'>Transaction ID (TID)</label>
                    <input
                      type="text"
                      name="tid"
                      className="form-control py-2"
                      placeholder="e.g. T123456789"
                      value={tid}
                      onChange={(e) => setTid(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

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

                                <Td className=''>{calculateTotalPrice(item)}</Td>
                                {/* <Td className='pt-5'>@mdo</Td> */}
                                {/* <Td>@mdo</Td>
                    <Td>@mdo</Td> */}
                              </Tr>
                            </Tbody>


                          ))}

                          <Thead className="bg-dark">
                            <Tr>
                              <Th colSpan="2" className="ps-3">Grand Total</Th>
                              <Th className="ps-3">RS {cartTotal.total}</Th>
                            </Tr>
                          </Thead>
                        </Table>

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button
                          className='btn btn-success d-flex align-items-center justify-content-center gap-2'
                          onClick={handleConfirmClick}
                          disabled={isProcessing}
                        >
                          {!isProcessing ? (
                            "Confirm"
                          ) : (
                            <>
                              <span>Submitting Order...</span>
                              <div className='spinner-border spinner-border-sm' role="status" />
                            </>
                          )}
                        </button>
                      </div>
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
