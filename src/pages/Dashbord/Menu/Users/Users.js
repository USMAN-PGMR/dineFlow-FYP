import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { firestore } from '../../../../config/firebase';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';


export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'users'), orderBy('dateCreated', 'asc')),
      (querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUsers(messagesData);
        setIsLoading(false);
      }
    );

    // Clean up the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);
  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <h5>Users</h5>
          <p className="fw-semibold">
            <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
            <Link className="text-decoration-none text-dark">Users </Link>
          </p>
        </div>
        <div className="row px-4">
          <div className="col-12 mt-4">
            <div className="card border-0 py-4 px-3">
              {!isLoading ? (
                users.length > 0 ? (
                  <Table className="table ps-4">
                    <Thead className="bg-dark">
                      <Tr>
                        <Th scope="col">Image</Th>
                        {/* <Th scope="col">Date</Th> */}
                        <Th scope="col">Name</Th>
                        <Th scope="col">Email</Th>
                        <Th scope="col">Number</Th>
                        <Th scope="col">Address</Th>
                        <Th scope="col">Bio</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {users.map((user, index) => (
                        <Tr key={index}>
                          <Td className="my-auto">
                            {user.image ? (
                              <img
                                className="rounded-circle img-fluid"
                                src={user.image}
                                style={{ width: '40px', height: '40px' }}
                                alt=""
                              />
                            ) : (
                              <Avatar
                                size={40}
                                className=''
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                icon={<UserOutlined />} // Fallback icon when the user is not logged in
                                alt="Default Avatar"
                              />
                            )}
                          </Td>
                          {/* <Td className="">
                              <span className="d-inline-block ps-1 ">{user.dateCreated.toDate().toLocaleString()}</span>
                            </Td> */}
                          <Td className="my-auto">
                            {user.fullName}
                          </Td>
                          <Td className="">{user.email}</Td>
                          <Td className="">{user.number}</Td>
                          <Td>{user.address}</Td>
                          <Td>{user.bio}</Td>
                          {/* <Td className="text-center">
                              <Link
                                className="text-danger"
                                disabled={isDeleteProcessing}
                                onClick={() => {
                                  handleDelete(user);
                                }}
                              >
                                {!isDeleteProcessing || isDeleteProcessing !== user.id ? (
                                  <i className="fa-solid fa-trash"></i>
                                ) : (
                                  <div className="spinner-border spinner-border-sm"></div>
                                )}
                              </Link>
                            </Td> */}
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
  )
}
