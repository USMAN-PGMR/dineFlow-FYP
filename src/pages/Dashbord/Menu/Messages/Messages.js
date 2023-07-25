import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { firestore } from '../../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
export default function Messages() {

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Function to get data from Firestore and update the products state
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Messages'));
        const productsData = querySnapshot.docs.map((doc) => doc.data());
        setMessages(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);
  return (
    <>
    <div className="container p-3">
        <div className="row">
          <div className="col-12">
            <h5>Messages</h5>
            <p className="fw-semibold">
              <Link  className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
              <Link className="text-decoration-none text-dark">Messages </Link>
            </p>
          </div>
          <div className="row px-4">
            <div className="col-12 mt-4">
              <div className="card border-0 py-4 px-3">
              {!isLoading ? (
                <Table className="table ps-4 ">
                            <Thead className='bg-dark'>
                                <Tr>
                                    <Th  scope="col">Date</Th>
                                    <Th scope="col">Name</Th>
                                    <Th scope="col">Email</Th>
                                    <Th scope="col">Subject</Th>
                                    <Th scope="col">Message</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {messages.map((msg, index) => (
                                    <Tr key={index}>
                                       
                                        <Td colspan="" className="">
                                            {/* <img
                                                src={msg.image}
                                                alt=""
                                                style={{ width: '40px', height: '40px' }}
                                                className="img-fluid d-inline circular"
                                            /> */}
                                            <span className="d-inline-block ps-1 ">{msg.dateSended.toDate().toLocaleString()}</span>
                                        </Td>
                                        <Td className="my-auto">{msg.firstName} {msg.lastName}</Td>
                                        <Td className="">
                                            {msg.email}
                                        </Td>
                                        <Td >{msg.subject}</Td>
                                        <Td >{msg.message}</Td>
                                       
                                    </Tr>
                                ))}
                         
                            </Tbody>
                        </Table>
              ):(
                <div className="text-center">
                  <div className="spinner spinner-grow"></div>
                </div>
              )}

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
