import { Timestamp, collection, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { firestore } from '../../../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const orderDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleString();
    }
    return '';
  };

  const fetchCartData = async () => {
    try {
      const cartRef = collection(firestore, 'carts');
      const q = query(cartRef, orderBy('dateSended', 'asc'));
      const querySnapshot = await getDocs(q);
      const allUsersCartData = querySnapshot.docs.map((doc) => ({
        orderId: doc.id,
        items: doc.data().items || [],
      }));

      setOrders(allUsersCartData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const calculateTotalPrice = (item) => {
    return (item.price * item.qty).toFixed(2);
  };

  const taxRate = 0.07;

  const calculateGrandTotal = (items) => {
    const subtotal = items.reduce(
      (total, item) => total + parseFloat(calculateTotalPrice(item)),
      0
    );
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;
    return grandTotal.toFixed(2);
  };

  const updateOrderStatus = async (orderId, itemIndex, newStatus) => {
    try {
      const orderRef = doc(firestore, 'carts', orderId);
      const orderSnapshot = await getDoc(orderRef);

      if (orderSnapshot.exists()) {
        const orderData = orderSnapshot.data();
        const updatedItems = [...orderData.items];
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], status: newStatus };

        await updateDoc(orderRef, { items: updatedItems });

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId
              ? {
                ...order,
                items: updatedItems,
              }
              : order
          )
        );
        window.toastify("Status is updated successfully",'success')
        // console.log('Order status updated successfully');
      } else {
        window.toastify("Status is not updated ",'error')
        console.error('Order not found');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  // -----------cchange the color of selector-------------
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return { borderColor: 'orange', color: 'orange' };
      case 'working':
        return { borderColor: 'blue', color: 'blue' };
      case 'done':
        return { borderColor: 'green', color: 'green' };
      default:
        return {};
    }
  };

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <h5>Orders</h5>
          <p className="fw-semibold">
            <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
            <Link className="text-decoration-none text-dark">Orders</Link>
          </p>
        </div>
      </div>
      <div className="row px-4">
        <div className="col-12 mt-4">
          <div className="card border-0 py-4 px-3">
            {!isLoading ? (
              orders.length > 0 ? (
                <div className="table-responsive">
                  {orders.map((order, i) => (
                    <div key={i}>
                      <h5 className="pt-3 text-primary" style={{ fontFamily: 'fantasy' }}>
                        Order {i + 1}
                      </h5>
                      <Table className="table customOrderTable">
                        <Thead className="orderTable">
                          <Tr>
                            <Th scope="col">S.No.</Th>
                            <Th scope="col">Date</Th>
                            <Th scope="col">Customer Email</Th>
                            <Th scope="col">Type</Th>
                            <Th scope="col">Name</Th>
                            <Th scope="col">Price</Th>
                            <Th scope="col">Quantity</Th>
                            <Th scope="col">Total</Th>
                            <Th scope="col text-center">Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {order.items.map((item, index) => (
                            <Tr key={index}>
                              <Td className="my-auto">{index + 1}</Td>
                              <Td>{orderDate(item.dateSended)}</Td>
                              <Td>{item.email}</Td>
                              <Td>{item.type}</Td>
                              <Td>{item.name}</Td>
                              <Td>{item.price}$</Td>
                              <Td>
                                <div className="ps-md-4">{item.qty}</div>
                              </Td>
                              <Td>{calculateTotalPrice(item)}$</Td>
                              <Td className=" px-0">
                                <select
                                  style={{
                                    fontSize: '13px',
                                    cursor:'pointer',
                                    ...getStatusColor(item.status), // Set the border and text color based on selected status
                                  }}
                                  name="status"
                                  className="form-control w-75 ms-0"
                                  value={item.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value;
                                    updateOrderStatus(order.orderId, index, newStatus);
                                  }}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="working">Working</option>
                                  <option value="done">Done</option>
                                </select>
                              </Td>

                            </Tr>
                          ))}
                        </Tbody>
                        <Thead className="bg-dark">
                          <Tr>
                            <Th colSpan="7" className="ps-3">
                              Grand Total
                            </Th>
                            <Th colSpan="2" className="text-center">
                              {calculateGrandTotal(order.items)}$
                              <div
                                className="btn btn-sm border-0 p-0 ms-4"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                <i className="fa-regular fa-eye"></i>
                              </div>
                            </Th>
                          </Tr>
                        </Thead>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-4 text-primary" id="exampleModalLabel">Billing Detail</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body py-4">
                                <p className="">
                                  Here billing detail will be shown!
                                  <br />
                                  We will get the billing details during the checkout and show them here.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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
