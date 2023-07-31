import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { firestore, storage } from '../../../../config/firebase';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AuthContext } from '../../../../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateProduct, setUpdateProduct] = useState({});
  const [isProcessing, setisProcessing] = useState(false);

  const [image, setImage] = useState(null);

  const { user } = useContext(AuthContext);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'Products'), orderBy('dateCreated', 'asc')),
      (querySnapshot) => {
        const productsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsData);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  const handleDelete = async (productId) => {
    try {
      const productRef = doc(firestore, 'Products', productId);
      await deleteDoc(productRef);
      setProducts(products.filter((product) => product.id !== productId));
      window.toastify('Product successfully deleted', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      window.toastify('Product is not deleted', 'error');
    }
  };

  const handleChange = (e) => {
    setUpdateProduct((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };


  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //     setUpdateProduct((prevState) => ({
  //       ...prevState,
  //       imageUrl: URL.createObjectURL(e.target.files[0]),
  //     }));
  //   }
  // };
   // Function to upload image to Firebase Storage
  //  const uploadImageToStorage = async (file) => {
  //   try {
  //     const storageRef = ref(storage, `Product_images/${user.uid}`);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     await uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         // Handle progress if needed
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //       },
  //       async () => {
  //         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //         // Update the profile state with the image URL
  //         setUpdateProduct((UpdateProduct) => ({
  //           ...UpdateProduct,
  //           image: downloadURL,
  //         }));
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   }
  // };
  // Function to handle image upload
  // const handleImageUpload = async () => {
  //   if (image) {
  //     setisProcessing(true);
  //     await uploadImageToStorage(image);
  //     setisProcessing(false);
  //   }
  // };
// -----------------HANDLE UPDATED----------------
// const handleUpdate = async () => {
//   setisProcessing(true);
//   try {
//     const formData = {
//       ...updateProduct,
//       dateModified: serverTimestamp(),
//       emailModified: {
//         email: user.email,
//         uid: user.uid,
//       },
//     };
//     if (image) {
//       // If there is a new image selected, upload it to storage and get the URL
//       const storageRef = storage.ref();
//       const imageRef = storageRef.child(`product_images/${image.name}`);
//       await imageRef.put(image);
//       const imageUrl = await imageRef.getDownloadURL();

//       // Set the image URL in the formData before updating Firestore
//       formData.image = imageUrl;
//     }

//     await setDoc(doc(firestore, "Products", formData.id), formData, { merge: true });
//     // ---SET ACCORDING TO CALENDER SELECTION---
   
//     window.toastify("Todo has been updated successfully", "success");
//   } catch (error) {
//     console.error(error);
//     window.toastify("Something went wrong! Todo isn't added", "error");
//   }
//   setisProcessing(null);
// };
const handleUpdate = async (e) => {
  e.preventDefault();
  setisProcessing(true);
  try {
    const formData = {
      ...updateProduct,
      dateModified: serverTimestamp(),
      emailModified: {
        email: user.email,
        uid: user.uid,
      },
    };

    // Upload the image first, if available
    if (image) {
      const storageRef = ref(storage, `Product_images/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress if needed
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // Update the formData with the new image URL
          formData.image = downloadURL;
          // Update the Firestore document with the new formData
          await updateDoc(doc(firestore, "Products", formData.id), formData);
          window.toastify("Product has been updated successfully", "success");
          setUpdateProduct({}); // Reset the updateProduct state to clear the form after successful update
          setisProcessing(false);
        }
      );
    } else {
      // If no new image is selected, update the Firestore document with the existing formData
      await updateDoc(doc(firestore, "Products", formData.id), formData);
      window.toastify("Product has been updated successfully", "success");
      setUpdateProduct({}); // Reset the updateProduct state to clear the form after successful update
      setisProcessing(false);
    }
  } catch (error) {
    console.error(error);
    window.toastify("Something went wrong! Product update failed", "error");
    setisProcessing(false);
  }
};






// Function to handle image change
const handleImageChange = (e) => {
  if (e.target.files[0]) {
    setImage(e.target.files[0]);
  }
};



const avatarIcon = updateProduct.image ? (
  <img className="img-fluid w-100" src={updateProduct.image} alt="Selected Avatar" />
) : (
  <UserOutlined />
);





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
                  products.length > 0 ? (
                    <div className="table-responsive">


                    <Table className="table  ">
                      <Thead className='bg-dark'>
                        <Tr>
                          <Th scope="col">Image</Th>
                          <Th scope="col">Name</Th>
                          <Th scope="col">Title</Th>
                          <Th scope="col">Type</Th>
                          <Th scope="col">Category</Th>
                          <Th scope="col">Slug</Th>
                          <Th scope="col">Stock</Th>
                          <Th scope="col">Price</Th>
                          <Th scope="col">Discount</Th>
                          <Th scope="col">Status</Th>
                          <Th scope="col">Description</Th>
                          <Th scope="col">Action</Th>

                        </Tr>
                      </Thead>
                      <Tbody >
                        {products.map((item, i) => (
                          <Tr key={i}>

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
                            <Td >
                              <div className="dropdown dropend">
                                <button className="btn bg-transparent text-dark border-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-width  ">
                                  <li><Link className="dropdown-item " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUpdateProduct(item)} >Edit</Link></li>
                                  <li><Link className="dropdown-item " onClick={() => handleDelete(item.id)} >Delete</Link></li>

                                </ul>
                              </div>
                            </Td>
                          </Tr>
                        ))}

                      </Tbody>
                    </Table>
                  </div>
                  ) : (
                    <p className="text-center text-danger fs-4">No Product Is Available</p>

                  )
                ) : (
                  <div className="text-center">
                    <div className="spinner spinner-grow"></div>
                  </div>
                )}


              </div>
            </div>
          </div>
          {/* ----------model-------- */}
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Update Product</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-4 offset-4 text-center  align-items-end">
                      <Avatar
                        className="text-center my-3 mx-auto"
                        size={150}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        icon={avatarIcon}
                        alt="Default Avatar"
                      />
                      <input type="file" className="form-control" onChange={handleImageChange} />
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-12   mt-4  ">
                        <div className="card  border-0 px-2 px-lg-4 py-3">
                          <form >
                            <div className="row pt-2 ">
                              <div className="col-12 col-lg-6">
                                <label for="name" className='fw-semibold py-2'>Name</label>
                                <input type="text" name='name' className='form-control py-2' placeholder='Name' value={updateProduct.name} onChange={handleChange} />
                              </div>
                              <div className="col-12 col-lg-6">
                                <label for="title" className='fw-semibold py-2'>Title</label>
                                <input type="text" name='title' className='form-control py-2' placeholder='Title ' value={updateProduct.title} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="row pt-2 ">
                              <div className="col-12 col-lg-6">
                                <label for="type" className='fw-semibold py-2'>Type</label>
                                <input type="text" name='type' className='form-control py-2' placeholder='Type' value={updateProduct.type} onChange={handleChange} />
                              </div>
                              <div className="col-12 col-lg-6">
                                <label for="catetory" className='fw-semibold py-2'>Catetory</label>
                                <input type="text" name='category' className='form-control py-2' placeholder='Catetory ' value={updateProduct.category} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="row pt-2 ">
                              <div className="col-12 col-lg-6">
                                <label for="slug" className='fw-semibold py-2'>Slug</label>
                                <input type="text" name='slug' className='form-control py-2' placeholder='Slug' value={updateProduct.slug} onChange={handleChange} />
                              </div>
                              <div className="col-12 col-lg-6">
                                <label for="stock" className='fw-semibold py-2'>Stock</label>
                                <input type="number" name='stock' className='form-control py-2' placeholder='Stock ' value={updateProduct.stock} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="row pt-2 ">
                              <div className="col-12 col-lg-6">
                                <label for="price" className='fw-semibold py-2'>Price</label>
                                <input type="number" name='price' className='form-control py-2' placeholder='Price' value={updateProduct.price} onChange={handleChange} />
                              </div>
                              <div className="col-12 col-lg-6">
                                <label for="discount" className='fw-semibold py-2'>Discount</label>
                                <input type="number" name='discount' className='form-control py-2' placeholder='Discount ' value={updateProduct.discount} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="row pt-2">
                              <div className="col-12  ">
                                <label htmlFor="status" className='fw-semibold py-2'>Status</label>
                                <select name="status" className='form-control py-2' value={updateProduct.status} onChange={handleChange} >
                                  <option value="none">Select The Status</option>
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                  {/* <option value="Country 3">Country 3</option> */}
                                </select>
                              </div>
                             
                            </div>
                            <div className="row py-2">
                              <div className="col-12">
                                <label for="description" className='fw-semibold py-2'>Description</label>
                                <textarea rows='5' type="text" name='description' className='form-control py-2' placeholder='Add The Description' value={updateProduct.description} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="row py-2">
                              <button className='btn btn-primary w-50 mx-auto' onClick={(e) => handleUpdate(e)} disabled={isProcessing}>
                                {!isProcessing ? "Update Product" : <div className='spinner spinner-border spinner-border-sm'></div>}

                              </button>
                            </div>
                          </form>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
