import { Timestamp, collection, getDoc, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { firestore } from '../../../../config/firebase';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchId, setSearchId] = useState('');

  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

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
        docId: doc.id, // 👈 this is actual Firestore document ID
        ...doc.data(),
      }));


      setOrders(allUsersCartData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
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

  const updateOrderStatus = async (docId, newStatus) => {
    try {
      const orderRef = doc(firestore, 'carts', docId); // 👈 actual document id
      await updateDoc(orderRef, { status: newStatus });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.docId === docId ? { ...order, status: newStatus } : order
        )
      );

      window.toastify("Status updated successfully", "success");
    } catch (error) {
      console.error("Error updating status:", error);
      window.toastify("Error updating status", "error");
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return { borderColor: 'orange', color: 'orange' };
      case 'working':
        return { borderColor: 'blue', color: 'blue' };
      case 'on-way':
        return { borderColor: 'black', color: 'black' };
      case 'done':
        return { borderColor: 'green', color: 'green' };
      default:
        return {};
    }
  };

  const filteredOrders = orders.filter(order =>
    (filterStatus === 'all' || order.status === filterStatus) &&
    order.orderId.toLowerCase().includes(searchId.toLowerCase())
  );


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

      <div className="d-flex flex-wrap align-items-center justify-content-between px-3 mx-2 mt-3 gap-2">
        {/* Filter Buttons */}
        <div className="d-flex flex-wrap gap-2">
          {['all', 'pending', 'working', 'on-way', 'done'].map((status) => (
            <button
              key={status}
              className={`btn btn-sm ${filterStatus === status ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Search + Clear */}
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            style={{ width: '250px' }}
            placeholder="Search by Order ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          {searchId && (
            <button className="btn btn-sm btn-danger" onClick={() => setSearchId('')}>
              Clear
            </button>
          )}
        </div>
      </div>


      <div className="row px-4">
        <div className="col-12 mt-4">
          <div className="card border-0 py-4 px-3">
            {!isLoading ? (
              filteredOrders.length > 0 ? (
                <div className="table-responsive">
                  {filteredOrders.map((order, i) => (
                    <div key={i}>
                      <h3 className="pt-3 text-success d-inline-block">Order:{i + 1}</h3>
                      <h5 className="pt-3 text-primary text-end d-inline-block" style={{ fontFamily: 'fantasy' }}>
                        / Order ID: {order.orderId}
                      </h5>
                      <Table className="table customOrderTable">
                        <Thead className="orderTable">
                          <Tr>
                            <Th>S.No.</Th>
                            <Th>Date</Th>
                            <Th>Customer Email</Th>
                            <Th>Type</Th>
                            <Th>Name</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th>Total</Th>
                            {/* <Th>Status</Th> */}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item, index) => (
                              <Tr key={index}>
                                <Td>{index + 1}</Td>
                                <Td>{orderDate(order.dateSended)}</Td>
                                <Td>{order.email}</Td>
                                <Td>{item.type}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.price}</Td>
                                <Td>{item.qty}</Td>
                                <Td>{item.total}</Td>
                              </Tr>
                            ))
                          ) : (
                            <Tr>
                              <Td colSpan="8" className="text-center text-muted">
                                No items found for this order.
                              </Td>
                            </Tr>
                          )}
                        </Tbody>

                        <Thead className="bg-dark ms-3">
                          <Tr>
                            <Th colSpan="7" className="ps-2 border">Grand Total</Th>
                            <Th colSpan="2" className=''>
                              RS {order.grandTotal}
                              <button
                                className="btn btn-sm border-0 ms-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => setSelectedOrderDetail(order)}
                              >
                                <i className="fa-regular fa-eye"></i>
                              </button>
                            </Th>
                          </Tr>
                        </Thead>
                        <Thead className="bg-light">
                          <Tr>
                            <Th colSpan="7" className="ps-2">Status</Th>
                            <Th colSpan="1">
                              <select
                                style={{ fontSize: '13px', cursor: 'pointer', ...getStatusColor(order.status) }}
                                name="status"
                                className="form-control  text-center m-0 p-0 w-75"
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.docId, e.target.value)}

                              >

                                <option value="pending">Pending</option>
                                <option value="working">Working</option>
                                <option value="on-way">On the way</option>
                                <option value="done">Done</option>
                              </select>
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

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-4 text-primary" id="exampleModalLabel">Billing & Payment Detail</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body py-4">
                    {selectedOrderDetail ? (
                      <>
                        <h6><strong>Billing Info:</strong></h6>
                        <p>
                          <strong>Name:</strong> {selectedOrderDetail.billing?.firstName} {selectedOrderDetail.billing?.lastName}<br />
                          <strong>Email:</strong> {selectedOrderDetail.billing?.email}<br />
                          <strong>Phone:</strong> {selectedOrderDetail.billing?.phone}<br />
                          <strong>Country:</strong> {selectedOrderDetail.billing?.country}<br />
                          <strong>City:</strong> {selectedOrderDetail.billing?.city}<br />
                          <strong>Street:</strong> {selectedOrderDetail.billing?.street1}, {selectedOrderDetail.billing?.street2}<br />
                          <strong>Company:</strong> {selectedOrderDetail.billing?.companyName || 'N/A'}<br />
                          <strong>Notes:</strong> {selectedOrderDetail.billing?.notes || 'N/A'}
                        </p>

                        <hr />

                        <h6><strong>Payment Info:</strong></h6>
                        <p>
                          <strong>Method:</strong>{" "}
                          {selectedOrderDetail.payment?.method === "cod"
                            ? "Cash On Delivery"
                            : selectedOrderDetail.payment?.method === "easypaisa"
                              ? "Easypaisa / JazzCash"
                              : selectedOrderDetail.payment?.method}<br />
                          {selectedOrderDetail.payment?.method === 'easypaisa' && (
                            <>
                              <strong>TID:</strong> {selectedOrderDetail.payment?.tid}<br />
                              <strong>Screenshot:</strong> {selectedOrderDetail.payment?.screenshotURL ? (
                                <a href={selectedOrderDetail.payment.screenshotURL} target="_blank" rel="noreferrer">View Screenshot</a>
                              ) : 'N/A'}
                            </>
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="text-muted">No details available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
