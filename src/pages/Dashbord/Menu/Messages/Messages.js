import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../../../config/firebase';
import { collection, onSnapshot, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteProcessing, setIsDeleteProcessing] = useState(null);

 // ...

useEffect(() => {
  const unsubscribe = onSnapshot(
    query(collection(firestore, 'Messages'), orderBy('dateSended', 'asc')),
    (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(messagesData);
      setIsLoading(false);
    }
  );

  // Clean up the subscription when the component is unmounted
  return () => unsubscribe();
}, []);

// ...

  

  // handle Delete
  const handleDelete = async (msg) => {
    console.log('Deleting message:', msg.id);
    try {
      setIsDeleteProcessing(msg.id); // Show spinner for the specific message being deleted

      // Get the reference to the document in the 'Messages' collection
      const messageRef = doc(firestore, 'Messages', msg.id);

      // Delete the document
      await deleteDoc(messageRef);
      
      // Remove the deleted message from the state
      setMessages(messages.filter((message) => message.id !== msg.id));
      window.toastify('Message successfully deleted', 'success');
      // console.log('Message successfully deleted:', msg.id);
    } catch (error) {
      console.error('Error deleting message:', error);
      window.toastify('Message is not deleted', 'error');
    } finally {
      setIsDeleteProcessing(null); // Hide spinner after delete (whether successful or not)
    }
  };

  return (
    <>
      <div className="container p-3">
        <div className="row">
          <div className="col-12">
            <h5>Messages</h5>
            <p className="fw-semibold">
              <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
              <Link className="text-decoration-none text-dark">Messages </Link>
            </p>
          </div>
          <div className="row px-4">
            <div className="col-12 mt-4">
              <div className="card border-0 py-4 px-3">
                {!isLoading ? (
                  messages.length > 0 ? (
                    <Table className="table ps-4">
                      <Thead className="bg-dark">
                        <Tr>
                          <Th scope="col">Date</Th>
                          <Th scope="col">Name</Th>
                          <Th scope="col">Email</Th>
                          <Th scope="col">Subject</Th>
                          <Th scope="col">Message</Th>
                          <Th scope="col">Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {messages.map((msg, index) => (
                          <Tr key={index}>
                            <Td className="">
                              <span className="d-inline-block ps-1 ">{msg.dateSended.toDate().toLocaleString()}</span>
                            </Td>
                            <Td className="my-auto">
                              {msg.firstName} {msg.lastName}
                            </Td>
                            <Td className="">{msg.email}</Td>
                            <Td>{msg.subject}</Td>
                            <Td>{msg.message}</Td>
                            <Td className="text-center">
                              <Link
                                className="text-danger"
                                disabled={isDeleteProcessing}
                                onClick={() => {
                                  handleDelete(msg);
                                }}
                              >
                                {!isDeleteProcessing || isDeleteProcessing !== msg.id ? (
                                  <i className="fa-solid fa-trash"></i>
                                ) : (
                                  <div className="spinner-border spinner-border-sm"></div>
                                )}
                              </Link>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  ) : (
                    <p className="text-center text-danger fs-4">No Message Is Available</p>
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
      </div>
    </>
  );
}
