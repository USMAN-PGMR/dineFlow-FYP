import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firestore } from '../../../../config/firebase';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";


export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Function to get data from Firestore and update the products state
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'Products'));
        const productsData = querySnapshot.docs.map((doc) => doc.data());
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="container p-3">
        <div className="row">
          <div className="col-12">
            <h5>All Products</h5>
            <p className="fw-semibold">
              <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
              <Link className="text-decoration-none text-dark">All Products</Link>
            </p>
          </div>
          <div className="row px-4">
            <div className="col-12 mt-4">
              <div className="card border-0 py-4 px-2">
                {!isLoading ? (
                  <Table className="table ">
                    <Thead className='bg-dark'>
                      <Tr>
                        <Th scope="col">Image</Th>
                        <Th scope="col">Name</Th>
                        <Th scope="col">Totle</Th>
                        <Th scope="col">Type</Th>
                        <Th scope="col">Category</Th>
                        <Th scope="col">Slug</Th>
                        <Th scope="col">Stock</Th>
                        <Th scope="col">Price</Th>
                        <Th scope="col">Discount</Th>
                        <Th scope="col">Status</Th>
                        <Th scope="col">Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody >
                      {products.map((item, index) => (
                        <Tr key={index}>

                          <Td className="my-auto">
                            <img
                              src={item.image}
                              alt=""
                              style={{ width: '40px', height: '40px' }}
                              className="img-fluid d-inline circular"
                            />
                          </Td>
                          <Td colspan="" className="">
                            <span className="d-inline-block ps-1 ">{item.name}</span>
                          </Td>
                          <Td className="my-auto">{item.title}$</Td>
                          <Td className="">
                            {item.type}
                          </Td>
                          <Td >{item.category}</Td>
                          <Td >{item.slug}</Td>
                          <Td >{item.stock}</Td>
                          <Td >{item.price}</Td>
                          <Td >{item.discount}</Td>
                          <Td >{item.status}</Td>
                          <Td >{item.description}</Td>
                        </Tr>
                      ))}

                    </Tbody>
                  </Table>
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
