import React, { useContext,  useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { firestore, storage } from '../../../../config/firebase'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'



import '../../../../config/global'

const initialState = {
  name: "",
  title: "",
  type: "",
  category: "",
  slug: '',
  stock: "",
  price: '',
  discount: '',
  status: "none",
  description: "",
  // image:'',
  // time:'',
}

export default function AddProducts() {
  // for image
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState();
  // for content
  const [state, setState] = useState(initialState)
  const [isProcessing, setisProcessing] = useState(false)


  const { user } = useContext(AuthContext)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }



  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }
  // console.log('e.target', e.target)
  // ----------Handle Submit---------
  const handleSubmit = e => {
    e.preventDefault();
    setisProcessing(true)
    if (!image) {
      console.error("Image not selected");
      window.toastify("Image not selected", "error")
      setisProcessing(false);
      return;
    }

    const storageRef = ref(storage, `Product_images/${image.name + Math.random().toString(10).slice(2)}`);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log('error', error)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL)
          let { name, title, type, category, slug, stock, price, discount, status, description } = state

          name = name.trim()
          title = title.trim()
          type = type.trim()
          category = category.trim()
          slug = slug.trim()
          status = status.trim()
          description = description.trim()


          let ProductsData = { name, title, type, category, slug, stock, price, discount, status, description, image: downloadURL, }

          ProductsData.dateCreated = serverTimestamp()
          ProductsData.id = window.getRandomId()
          // ProductsData.status = "active"
          ProductsData.createdBy = {
            email: user.email,
            uid: user.uid
          }
          createDocument(ProductsData)

        });
      }
    );



    // console.log(ProductsData.name)

  }

  //----------------Create Document----------------
  const createDocument = async (ProductsData) => {
    // console.log(formData)
    try {
      await setDoc(doc(firestore, "Products", ProductsData.id), ProductsData);
      setisProcessing(false)

      window.toastify("Product has been added successfully", "success")
      setImage(null);
      setState(initialState)
      // clearInput()
    } catch (err) {
      console.error(err)
      setisProcessing(false)

      window.toastify("Something went wrong! Product isn't added", "error")
    }
    // setState(initialState)

    // setisProcessing(false)
  }

  // Conditionally set the Avatar icon
  const avatarIcon = image ? (
    <img
      className="img-fluid w-100"
      src={URL.createObjectURL(image)}
      alt="Selected Avatar"
    />
  ) : (
    <UserOutlined />
  );



  return (
    <>
      <div className="container  py-3">
        <div className="row">
          <div className="col-12">
            <h5>Add Products</h5>
            <p className='fw-semibold'><Link className='text-decoration-none text-secondary'>Dashboard</Link> / <Link className='text-decoration-none text-dark'>Add Products</Link></p>
          </div>
        </div>
        <div className="row px-lg-4">

          <div className="col-12 col-lg-8  mt-4  ">
            <div className="card  border-0 px-2 px-lg-4 py-3">
              <form onSubmit={handleSubmit}>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="name" className='fw-semibold py-2'>Name</label>
                    <input type="text" name='name' className='form-control py-2' placeholder='Name' value={state.name} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="title" className='fw-semibold py-2'>Title</label>
                    <input type="text" name='title' className='form-control py-2' placeholder='Title ' value={state.title} onChange={handleChange} />
                  </div>
                </div>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="type" className='fw-semibold py-2'>Type</label>
                    <input type="text" name='type' className='form-control py-2' placeholder='Type' value={state.type} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="catetory" className='fw-semibold py-2'>Catetory</label>
                    <input type="text" name='category' className='form-control py-2' placeholder='Catetory ' value={state.category} onChange={handleChange} />
                  </div>
                </div>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="slug" className='fw-semibold py-2'>Slug</label>
                    <input type="text" name='slug' className='form-control py-2' placeholder='Slug' value={state.slug} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="stock" className='fw-semibold py-2'>Stock</label>
                    <input type="number" name='stock' className='form-control py-2' placeholder='Stock ' value={state.stock} onChange={handleChange} />
                  </div>
                </div>
                <div className="row pt-2 ">
                  <div className="col-12 col-lg-6">
                    <label for="price" className='fw-semibold py-2'>Price</label>
                    <input type="number" name='price' className='form-control py-2' placeholder='Price' value={state.price} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label for="discount" className='fw-semibold py-2'>Discount</label>
                    <input type="number" name='discount' className='form-control py-2' placeholder='Discount ' value={state.discount} onChange={handleChange} />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-12">
                    <label htmlFor="status" className='fw-semibold py-2'>Status</label>
                    <select name="status" className='form-control py-2' value={state.status} onChange={handleChange} >
                      <option value="none">Select The Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-12">
                    <label for="description" className='fw-semibold py-2'>Description</label>
                    <textarea rows='5' type="text" name='description' className='form-control py-2' placeholder='Add The Description' value={state.description} onChange={handleChange} />
                  </div>
                </div>
                <div className="row py-2">
                  <button className='btn btn-primary w-50 mx-auto' disabled={isProcessing}>
                    {!isProcessing ? "Add Product" : <div className='spinner spinner-border spinner-border-sm'></div>}

                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-lg-4  mt-4">
            <div className="card border-0 px-4 py-3 text-center  align-items-center">
             
              <Avatar
                className="text-center my-3"
                size={150}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                icon={avatarIcon} // Conditionally set the Avatar icon
                alt="Default Avatar"
              />
              <input type="file" className='form-control' onChange={handleImageChange} />
              {/* <button className='btn mt-3 btn-primary'>Upload</button> */}
            </div>


          </div>
        </div>
      </div>

    </>
  )
}
