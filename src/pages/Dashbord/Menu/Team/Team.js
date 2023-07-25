import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsPlusLg } from 'react-icons/bs'
import { AuthContext } from '../../../../context/AuthContext'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { firestore } from '../../../../config/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";


const initialState = {
  fullName: '',
  email: '',
  address: '',
  profession: '',
  status: 'none',
  about: '',

}

export default function Team() {
  const [state, setState] = useState(initialState)
  const [TeamMember, setteamMember] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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


  // ----------Handle Submit---------
  const handleSubmit = e => {
    e.preventDefault();

    let { fullName, email, address, profession, status, about } = state

    fullName = fullName.trim()
    email = email.trim()
    address = address.trim()
    profession = profession.trim()
    status = status.trim()
    about = about.trim()



    // if (!title) {
    //   return window.toastify('Please enter your title', 'error')
    // }
    // if (title.length < 3) {
    //   return window.toastify('Title should be atleast 3 character', 'error')
    // }
    // if (!location) {
    //   return window.toastify('Please enter the location', 'error')
    // }
    // if (!time) {
    //   return window.toastify('Please set the time', 'error')
    // }
    // if (!discription) {
    //   return window.toastify('Please enter the discription', 'error')
    // }
    // if (discription.length < 10) {
    //   return window.toastify('Your discription is too short', 'error')
    // }


    //OR

    let TeamData = { fullName, email, address, profession, status, about }

    TeamData.dateCreated = serverTimestamp()
    TeamData.id = window.getRandomId()
    // ProductsData.status = "active"
    TeamData.createdBy = {
      email: user.email,
      uid: user.uid
    }

    createDocument(TeamData)
    fetchTeamMember();

  }

  //----------------Create Document----------------
  const createDocument = async (TeamData) => {
    // console.log(formData)
    setisProcessing(true)
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
                                <div className="col-12">
                                  <label htmlFor="status" className='fw-semibold py-2'>Status</label>
                                  <select name="status" className='form-control py-2' value={state.status} onChange={handleChange}>
                                    <option value="none">Select The Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    {/* <option value="Country 3">Country 3</option> */}
                                  </select>
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
                  <Table className="table ps-4 ">
                    <Thead className='bg-dark'>
                      <Tr>
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
