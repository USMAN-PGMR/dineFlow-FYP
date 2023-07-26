import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { firestore, storage } from '../../../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../../../../context/AuthContext';



export default function Profile() {
  // for image
  const { userInfo } = useContext(AuthContext);
  const initialState = {
    fullName: '',
    email: userInfo.email,
    number: '',
    role: '',
    address: '',
    profession: '',
    bio: '',
  }

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState();
  // for content
  const [state, setState] = useState(initialState)
  const [isProcessing, setisProcessing] = useState(false)


  const { user } = useContext(AuthContext)


  // -----------fetch the documents------------
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const docRef = doc(firestore, 'Admin_Profile', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setState(docSnap.data());
        } else {
          console.log('Document not found');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user && user.uid) {
      fetchProfileData();
    }
  }, []);
  // ---------handle image change----------------
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }


  //  ----------handle change---------------
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }
  // console.log('e.target', e.target)
  // ----------Handle Submit---------
  const handleSubmit = e => {
    e.preventDefault();
    setisProcessing(true)

    const storageRef = ref(storage, `Admin_Profile/${image.name + Math.random().toString(10).slice(2)}`);

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
          let { fullName, email, number, role, address, profession, bio } = state

          fullName = fullName.trim()
          //  email = email.trim()
          role = role.trim()
          address = address.trim()
          profession = profession.trim()
          bio = bio.trim()



          let adminData = { fullName, email, number, role, address, profession, bio, image: downloadURL, }

          adminData.dateCreated = serverTimestamp()
          adminData.id = window.getRandomId()
          // ProductsData.status = "active"
          adminData.createdBy = {
            email: user.email,
            uid: user.uid
          }
          createDocument(adminData)

        });
        setisProcessing(false)
      }
    );



    // console.log(ProductsData.name)

  }

  //----------------Create Document----------------
  const createDocument = async (adminData) => {
    // console.log(formData)
    try {
      await setDoc(doc(firestore, "Admin_Profile", adminData.id), adminData);
      window.toastify("Your Profile is Updated successfully", "success")
      //  setState(initialState)
      // clearInput()
    } catch (err) {
      console.error(err)
      window.toastify("Something went wrong! Profile is not updated", "error")
    }
    // setState(initialState)

    // setisProcessing(false)
  }

  // Conditionally set the Avatar icon
  //  const avatarIcon = image ? (
  //    <img
  //      className="img-fluid w-100"
  //      src={URL.createObjectURL(image)}
  //      alt="Selected Avatar"
  //    />
  //  ) : (
  //    <UserOutlined />
  //  );



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
      <div className="container p-3">
        <div className="row">
          <div className="col-12">
            <h5>Profile</h5>
            <p className="fw-semibold">
              <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
              <Link className="text-decoration-none text-dark">Profile </Link>
            </p>
          </div>
          <div className="row px-4">
            <div className="col-12 mt-4">
              {/* <div className="card border-0 py-4 px-3"> */}
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-5">
                    <div className="card border-0 py-4 px-3 justify-content-center align-items-center">
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
                    </div>

                  </div>
                  <div className="col-12 col-md-7">
                    <div className="card border-0 py-4 px-3">
                      <form onSubmit={handleSubmit}>

                        <div className="container ">
                          <div className="row pt-2   ">
                            <div className="col-12 col-lg-6">
                              <label for="fullName" className='fw-semibold py-2'>Full Name</label>
                              <input type="text" name='fullName' className='form-control py-2' placeholder='Full Name' value={state.fullName} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-lg-6">
                              <label for="email" className='fw-semibold py-2'>Email</label>
                              <input type="email" name='email' className='form-control py-2' placeholder='Email ' value={state.email} onChange={handleChange} />
                            </div>
                          </div>
                          <div className="row pt-2 ">
                            <div className="col-12 col-lg-6">
                              <label for="number" className='fw-semibold py-2'>Number</label>
                              <input type="tel" name='number' className='form-control py-2' placeholder='Number ' />
                            </div>
                            <div className="col-12 col-lg-6">
                              <label for="role" className='fw-semibold py-2'>Role</label>
                              <input type="text" name='role' className='form-control py-2' placeholder='Role ' value={state.role} onChange={handleChange} />
                            </div>
                          </div>
                          <div className="row pt-2 ">
                            <div className="col-12 col-lg-6">
                              <label for="address" className='fw-semibold py-2'>Address</label>
                              <input type="text" name='address' className='form-control py-2' placeholder='Address ' value={state.address} onChange={handleChange} />
                            </div>
                            <div className="col-12 col-lg-6">
                              <label for="profession" className='fw-semibold py-2'>Profession</label>
                              <input type="text" name='profession' className='form-control py-2' placeholder='Profession ' value={state.profession} onChange={handleChange} />
                            </div>
                          </div>

                          <div className="row py-2">
                            <div className="col-12">
                              <label for="bio" className='fw-semibold py-2'>Bio</label>
                              <textarea rows='5' type="text" name='bio' className='form-control py-2' placeholder='Short bio....' value={state.bio} onChange={handleChange} />
                            </div>
                          </div>
                          <div className="row py-2">
                            <button className='btn btn-primary w-50 mx-auto' disabled={isProcessing}>
                              {!isProcessing ? "Save" : <div className='spinner spinner-border spinner-border-sm'></div>}

                            </button>
                          </div>
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
    </>
  )
}
