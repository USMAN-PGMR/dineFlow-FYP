import React, { useContext, useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Timestamp, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { AuthContext } from '../../../context/AuthContext';

export default function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const orderDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString();
    }
    return '';
  };

  const fetchCartData = async () => {
    try {
      if (user?.uid) {
        const cartRef = collection(firestore, 'carts');
        const q = query(cartRef, where('userUid', '==', user.uid), orderBy('dateSended', 'asc'));
        const querySnapshot = await getDocs(q);
        const userCartData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setOrders(userCartData);
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

  const calculateTotalPrice = (item) => {
    return (item.price * item.qty).toFixed(2);
  };

  const taxRate = 0.07;
  const calculateGrandTotal = (items) => {
    const subtotal = items.reduce((total, item) => total + parseFloat(calculateTotalPrice(item)), 0);
    const tax = subtotal * taxRate;
    return (subtotal + tax).toFixed(2);
  };

  return (
    <div className="container py-5 px-lg-5">
      <div className="row">
        <h1 className="text-center py-3" style={{ fontFamily: 'fantasy' }}>My Order Detail</h1>
        <div className="col">
          <div className="card shadow border-0 py-4 px-3">
            {!isLoading ? (
              orders.length > 0 ? (
                <div className="table-responsive">
                  {orders.map((order, i) => (
                    <div key={i} className="mb-5">
                      <h5 className="pt-3 " style={{ fontFamily: 'fantasy' }}> <span className='text-dark'>Order {i + 1} - ID:</span> <span className='text-primary'>{order.orderId}</span> </h5>
                      <p className="text-muted mb-1">Date: {orderDate(order.dateSended)}</p>
                      <p className="text-muted mb-1">
                        Status:
                        <strong
                          style={{
                            color:
                              order.status === 'pending' ? 'orange' :
                                order.status === 'working' ? 'blue' :
                                  order.status === 'on-way' ? 'black' :
                                    order.status === 'done' ? 'green' :
                                      'gray',
                            marginLeft: '5px'
                          }}
                        >
                          {order.status === 'on-way' ? 'On the Way' : order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </strong>
                      </p>
                      <p className="text-muted mb-1">
                        Payment Method:
                        <strong className="text-secondary ms-1">
                          {order.payment?.method === 'cod'
                            ? 'Cash on Delivery'
                            : order.payment?.method === 'easypaisa' || order.payment?.method === 'jazzcash'
                              ? 'Easypaisa / JazzCash'
                              : order.payment?.method
                                ? order.payment.method.charAt(0).toUpperCase() + order.payment.method.slice(1)
                                : 'Unknown'}
                        </strong>
                      </p>

                      <p className="text-muted mb-2">Grand Total: <strong>RS {order.grandTotal}</strong></p>

                      <Table className="table customOrderTable">
                        <Thead className="orderTable">
                          <Tr>
                            <Th>S.No.</Th>
                            <Th>Name</Th>
                            <Th>Type</Th>
                            <Th>Price</Th>
                            <Th>Qty</Th>
                            <Th>Total</Th>
                            {/* <Th>Status</Th> */}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {order.items.map((item, index) => (
                            <Tr key={index}>
                              <Td>{index + 1}</Td>
                              <Td>{item.name}</Td>
                              <Td>{item.type}</Td>
                              <Td>{item.price}</Td>
                              <Td>{item.qty}</Td>
                              <Td>{item.total}</Td>
                              {/* <Td>{item.status || order.status}</Td> */}
                            </Tr>
                          ))}
                        </Tbody>
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
  );
}
