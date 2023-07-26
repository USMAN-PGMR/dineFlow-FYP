import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import { AuthContext } from '../../../../context/AuthContext'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { firestore, storage } from '../../../../config/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";


const initialState = {
  fullName: '',
  email: '',
  address: '',
  profession: '',
  status: 'none',
  about: '',
  // image:'',

}

export default function Team() {
  const [state, setState] = useState(initialState)
  const [TeamMember, setteamMember] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);

  const [isProcessing, setisProcessing] = useState(false)

  const { user } = useContext(AuthContext)

  // ---------Read/get the document-----------
  const fetchTeamMember = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Team'));
      const TeamMemberData = querySnapshot.docs.map((doc) => doc.data());
      setteamMember(TeamMemberData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching team member:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Function to get data from Firestore and update the products state

    fetchTeamMember();
  }, []);
  // ---------handle Change----------
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }
  // -------------handle imageChange-----------
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }


  //----------------Create Document----------------
  const createDocument = async (TeamData) => {
    // console.log(formData)
    // setisProcessing(true)
    try {
      await setDoc(doc(firestore, "Team", TeamData.id), TeamData);
      window.toastify("Team member has been added successfully", "success")
      setState(initialState)
      // clearInput()
    } catch (err) {
      console.error(err)
      window.toastify("Something went wrong! Team member isn't added", "error")
    }
    // setState(initialState)

    setisProcessing(false)
  }
  // ----------Handle Submit---------
  const handleSubmit = e => {
    e.preventDefault();
    setisProcessing(true)
   

    if (!state.fullName) {
      window.toastify('Please enter the name', 'error');
      setisProcessing(false);
      return;
    }
    if (state.fullName.length < 3) {
      window.toastify('Name is not correct', 'error');
      setisProcessing(false);
      return;
    }
    if (!state.email) {
      window.toastify('Please enter the email', 'error');
      setisProcessing(false);
      return;
    }
    if(!window.isEmail(state.email)){
      window.toastify('Please enter the correct email', 'error');
      setisProcessing(false);
      return;
    }
    if (!state.address) {
      window.toastify('Please enter the address', 'error');
      setisProcessing(false);
      return;
    }
    if (!state.profession) {
      window.toastify('Please enter the profession', 'error');
      setisProcessing(false);
      return;
    }
    if (!state.status) {
      window.toastify('Please enter the status', 'error');
      setisProcessing(false);
      return;
    }
    if (!state.about) {
      window.toastify('Please enter the about', 'error');
      setisProcessing(false);
      return;
    }
    if (!image) {
      // If no image is selected, display an error message and return
      window.toastify('Please select an image', 'error');
      setisProcessing(false);
      return;
    }

    const storageRef = ref(storage, `images/${image.name + Math.random().toString(10).slice(2)}`);

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
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // setUrl(downloadURL)

            let { fullName, email, address, profession, status, about, image } = state

            fullName = fullName.trim()
            email = email.trim()
            address = address.trim()
            profession = profession.trim()
            status = status.trim()
            about = about.trim()



          
           
            //OR

            let TeamData = { fullName, email, address, profession, status, about, image: downloadURL }

            TeamData.dateCreated = serverTimestamp()
            TeamData.id = window.getRandomId()
            TeamData.createdBy = {
              email: user.email,
              uid: user.uid
            }

            createDocument(TeamData)
            fetchTeamMember();
          });
        // setImage(null);
      }
    );





  }






  return (
    <>
      <div className="container p-3">
        <div className="row">
          <div className="col-12">
            <h5>Messages</h5>
            <p className="fw-semibold">
              <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
              <Link className="text-decoration-none text-dark">Team </Link>
            </p>
          </div>
          <div className="row px-4">
            <div className="col-12 mt-4">
              <div className="card border-0 py-4 px-3">
                <div className="row">
                  <div className="col text-end">
                    <span className='btn  w-auto  form-control btn-primary  ' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ float: 'end' }}> <BsPlusLg className='text-white mb-1' /> Add</span>

                  </div>
                  {/*------------------- model------------- */}
                  <div className="modal  fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog w-100 modal-dialog-centered" style={{ maxWidth: '800px' }}>
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-4  " id="exampleModalLabel">Add Team Member</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body py-4">
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
                                  <label for="address" className='fw-semibold py-2'>Address</label>
                                  <input type="text" name='address' className='form-control py-2' placeholder='Address ' value={state.address} onChange={handleChange} />
                                </div>
                                <div className="col-12 col-lg-6">
                                  <label for="profession" className='fw-semibold py-2'>Profession</label>
                                  <input type="text" name='profession' className='form-control py-2' placeholder='Profession ' value={state.profession} onChange={handleChange} />
                                </div>
                              </div>
                              <div className="row pt-2">
                                <div className="col-12 col-lg-6">
                                  <label htmlFor="status" className='fw-semibold py-2'>Status</label>
                                  <select name="status" className='form-control py-2' value={state.status} onChange={handleChange}>
                                    <option value="none">Select The Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    {/* <option value="Country 3">Country 3</option> */}
                                  </select>
                                </div>
                                <div className="col-12 col-lg-6">
                                  <label for="image" className='fw-semibold py-2'>Image</label>
                                  <input
                                    key={isProcessing ? "processing" : "normal"} // Add key prop here
                                    type="file"
                                    name="image"
                                    className="form-control py-2"
                                    placeholder="Image"
                                    onChange={handleImageChange}
                                  />
                                </div>
                              </div>
                              <div className="row py-2">
                                <div className="col-12">
                                  <label for="about" className='fw-semibold py-2'>About</label>
                                  <textarea rows='5' type="text" name='about' className='form-control py-2' placeholder='Explain Some About....' value={state.about} onChange={handleChange} />
                                </div>
                              </div>
                              <div className="row py-2">
                                <button className='btn btn-primary w-50 mx-auto' disabled={isProcessing}>
                                  {!isProcessing ? "Add Product" : <div className='spinner spinner-border spinner-border-sm'></div>}

                                </button>
                              </div>
                            </div>

                          </form>
                        </div>
                        {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success"  data-bs-dismiss="modal" >Confirm</button>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                {!isLoading ? (
                  TeamMember.length > 0 ? (
                    <Table className="table ps-4 ">
                      <Thead className='bg-dark'>
                        <Tr>
                          <Th scope="col">Image</Th>
                          <Th scope="col">Name</Th>
                          <Th scope="col">Email</Th>
                          <Th scope="col">Address</Th>
                          <Th scope="col">Profession</Th>
                          <Th scope="col">About</Th>
                          <Th scope="col">status</Th>
                        </Tr>
                      </Thead>
                      <Tbody >
                        {TeamMember.map((team, index) => (
                          <Tr key={index}>

                            <Td className="my-auto">
                              {team.image ? (
                                <img
                                  className="rounded-circle img-fluid"
                                  src={team.image}
                                  style={{ width: '40px', height: '40px' }}
                                  alt=""
                                />
                              ) : (
                                <span className="spinner text-center text-secondary spinner-border"></span>
                              )}
                            </Td>
                            <Td colspan="" className="">

                              <span className="d-inline-block ps-1 ">{team.fullName}</span>
                            </Td>
                            <Td className="my-auto">{team.email} </Td>
                            <Td className="">
                              {team.address}
                            </Td>
                            <Td >{team.profession}</Td>
                            <Td >{team.about}</Td>
                            <Td >{team.status}</Td>

                          </Tr>
                        ))}

                      </Tbody>
                    </Table>
                  ) : (
                    <p className="text-center text-danger fs-4">No Team Member!</p>
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
  )
}
