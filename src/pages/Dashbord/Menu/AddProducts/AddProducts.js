import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { firestore, storage } from '../../../../config/firebase'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
  // time:'',
}

export default function AddProducts() {
  // for image
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  // for content
  const [state, setState] = useState(initialState)
  const [isProcessing, setisProcessing] = useState(false)


  const { user } = useContext(AuthContext)
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  // const handleImageSubmit = () => {
  //   console.log('image', image)

  // }
  // Function to handle image upload to Firebase Storage
  const uploadImageToStorage = async () => {
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name + Math.random().toString(10).slice(2)}`);

      try {
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
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
            console.log('Error uploading image:', error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUrl(downloadURL);
            console.log('Image URL:', downloadURL);
            // Now that we have the image URL, we don't need to call handleSubmit here.
          }
        );
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.log('No image selected.');
    }
  };



  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }
  // console.log('e.target', e.target)
  // ----------Handle Submit---------
  const handleSubmit = async(e,imgUrl) => {
    e.preventDefault();
    uploadImageToStorage();
    // const storage = getStorage();
    // const storageRef = ref(storage, `images/${image.name + Math.random().toString(10).slice(2)}`);

    // const uploadTask = uploadBytesResumable(storageRef, image);

    // uploadTask.on('state_changed',
    //   (snapshot) => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '% done');
    //     switch (snapshot.state) {
    //       case 'paused':
    //         console.log('Upload is paused');
    //         break;
    //       case 'running':
    //         console.log('Upload is running');
    //         break;
    //     }
    //   },
    //   (error) => {
    //     console.log('error', error)
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       setUrl(downloadURL)
    //     });
    //   }
    // );

          let { name, title, type, category, slug, stock, price, discount, status, description } = state

          name = name.trim()
          title = title.trim()
          type = type.trim()
          category = category.trim()
          slug = slug.trim()
          status = status.trim()
          description = description.trim()


          let ProductsData = { name, title, type, category, slug, stock, price, discount, status, description, image: imgUrl, }

          ProductsData.dateCreated = serverTimestamp()
          ProductsData.id = window.getRandomId()
          // ProductsData.status = "active"
          ProductsData.createdBy = {
            email: user.email,
            uid: user.uid
          }

          console.log(ProductsData.name)
          createDocument(ProductsData)
  }

  //----------------Create Document----------------
  const createDocument = async (ProductsData) => {
    // console.log(formData)
    setisProcessing(true)
    try {
      await setDoc(doc(firestore, "Products", ProductsData.id), ProductsData);
      window.toastify("Product has been added successfully", "success")
      setState(initialState)
      // clearInput()
    } catch (err) {
      console.error(err)
      window.toastify("Something went wrong! Product isn't added", "error")
    }
    // setState(initialState)

    setisProcessing(false)
  }

  // ---------avatar--------
  const [avatarUrl, setAvatarUrl] = useState("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=");

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setAvatarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


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
                      {/* <option value="Country 3">Country 3</option> */}
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
              {/* <label className="avatar-input-label">
        <div className="avatar-placeholder">
          {avatarUrl && <img className='img-fluid w-100' src={avatarUrl} alt="Avatar" />}
        </div>
        <input type="file" name='img' className="form-control p-2" onChange={handleAvatarChange} />
      </label> */}
              <Avatar className='text-center my-3'
                
                size={150} // Adjust the size of the avatar as per your requirement
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                icon={<UserOutlined />} // Fallback icon when the user is not logged in
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
