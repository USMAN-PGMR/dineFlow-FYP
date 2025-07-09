import React, { useContext, useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Timestamp, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { AuthContext } from '../../../context/AuthContext';

export default function UserOrder() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // --convert the date of order
  const orderDate = (timestamp) => {
    // Check if the input is a Firestore Timestamp object
    if (timestamp instanceof Timestamp) {
      // Convert the Timestamp to a JavaScript Date object
      const date = timestamp.toDate();
      // Format the date into a human-readable string (you can customize the format as needed)
      return date.toLocaleString();
    }
    // If the input is not a Timestamp object, return an empty string or an appropriate default value
    return '';
  };
 

const fetchCartData = async () => {
  // console.log('user.uid', user.uid)
  try {
    if (user) {
      const cartRef = collection(firestore, 'carts');
      const q = query(
        cartRef,
        where('userUid', '==', user.uid),
        orderBy('dateSended', 'asc')
      );
      const querySnapshot = await getDocs(q);

      // Assuming each document contains 'items' field
      const userCartData = querySnapshot.docs.map((doc) => doc.data().items);
      setProducts(userCartData);
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchCartData();
}, [user]);
  
  
  // Function to calculate the total price for an item
  const calculateTotalPrice = (item) => {
    return (item.price * item.qty).toFixed(2);
  };
  // Function to calculate the grand total with tax
  const taxRate = 0.07; // Assuming tax rate is 7%, change it accordingly

  const calculateGrandTotal = (items) => {
    const subtotal = items.reduce(
      (total, item) => total + parseFloat(calculateTotalPrice(item)),
      0
    );
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;
    return grandTotal.toFixed(2);
  };

  return (
    <div className="container py-5 px-lg-5">
      <div className="row">
        <div className="row">
          <h1 className='text-center py-3' style={{fontFamily:'fantasy'}}>My Order Detail</h1>
        </div>
        <div className="col">
        <div className="card shadow border-0  py-4 px-3">
            {!isLoading ? (
              products.length > 0 ? (
                <div className="table-responsive">

                  {products.map((items, i) => (
                    <div key={i}>
                      <h5 className='pt-3 ' style={{fontFamily:'fantasy'}}>Order {i + 1}</h5>
                      <Table className="table customOrderTable">
                        <Thead className='orderTable' >
                          <Tr>
                            <Th scope="col">S.No.</Th>
                            <Th scope="col">Date</Th>
                            {/* <Th scope="col">Customer Email</Th> */}
                            <Th scope="col">Type</Th>
                            <Th scope="col">Name</Th>
                            <Th scope="col">Price</Th>
                            <Th scope="col">Quantity</Th>
                            <Th scope="col">Total</Th>
                            <Th scope="col">Status</Th>
                          </Tr>
                        </Thead>
                          {items.map((item, index) => (
                        <Tbody>
                            <Tr key={index}>
                              <Td className="my-auto">{index + 1}</Td>
                              <Td>{orderDate(item.dateSended)}</Td>
                              {/* <Td>{item.email}</Td> */}
                              <Td>{item.type}</Td>
                              <Td>{item.name}</Td>
                              <Td>{item.price}$</Td>
                              <Td  ><div className="ps-md-4">{item.qty}</div></Td>
                              <Td>{calculateTotalPrice(item)}$</Td>
                              <Td>{item.status}</Td>
                              
                            </Tr>
                            
                        </Tbody>
                          ))}
                          
                        <Thead className="bg-dark ">
                            <Tr className="">
                            <Th colSpan="7" className="ps-3 ">Grand Total</Th>
                            <Th colSpan="2" className="text-center ">
                            {calculateGrandTotal(items)}$
                            </Th>
                            </Tr>
                          </Thead>
                      </Table>
                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-center text-danger fs-4">No Order Is Available</p>

              )
            ) : (
              <div className="text-center">
                <div className="spinner spinner-grow"></div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  )
}
