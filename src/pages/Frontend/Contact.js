import React, { useEffect, useState } from 'react'
import SecondHeader from '../../copmonents/Frontend/SecondHeader/SecondHeader'
import TopBar from '../../copmonents/Frontend/TopBar/TopBar'
import DarkFooter from '../../copmonents/Frontend/DarkFooter'
import { firestore } from '../../config/firebase'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'



const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: ""

}
export default function Contact() {
  //**********************SEND MESSAGE********************* */
  const [state, setState] = useState(initialState)
  const [isProcessing, setisProcessing] = useState(false)

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  // ----------Handle Submit---------
  const handleSubmit = e => {
    e.preventDefault();

    let { firstName, lastName, email, subject, message } = state

    firstName = firstName.trim()
    lastName = lastName.trim()
    email = email.trim()
    subject = subject.trim()
    message = message.trim()


    if (!firstName) {
      return window.toastify('Please enter your First Name', 'error')
    }
    if (!lastName) {
      return window.toastify('Please enter your Last Name', 'error')
    }
    if (!email) {
      return window.toastify('Please enter your Email', 'error')
    }
    if (!subject) {
      return window.toastify('Please enter your Subject', 'error')
    }
    if (subject.length < 3) {
      return window.toastify('Please enter your subject correctly', 'error')
    }
    if (!message) {
      return window.toastify('Please enter the Message', 'error')
    }
    if (message.length < 10) {
      return window.toastify('Your Message is too short', 'error')
    }


    //OR

    let Messages = { firstName, lastName, email, subject, message }

    Messages.dateSended = serverTimestamp()
    Messages.id = window.getRandomId()
    // Messages.status = "active"
    // Messages.createdBy = {
    //   email: user.email,
    //   uid: user.uid
    // }

    createDocument(Messages)
  }

  //----------------Create Document----------------
  const createDocument = async (Messages) => {
    // console.log(formData)
    setisProcessing(true)
    try {
      await setDoc(doc(firestore, "Messages", Messages.id), Messages);
      window.toastify("Your message has been sended successfully", "success")
      setState(initialState)
      // clearInput()
    } catch (err) {
      console.error(err)
      window.toastify("Something went wrong! Message isn't sended", "error")
    }
    // setState(initialState)

    setisProcessing(false)
  }


  // ****************************END SEND MESSAGE*********************************
  // ****************************SHOW FIND US AND HOURS************************************
  const [findUs, setFindUs] = useState(null);
  const [hours, setHours] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const findUsSnap = await getDoc(doc(firestore, 'Contact', 'FindUs'));
        const hoursSnap = await getDoc(doc(firestore, 'Contact', 'Hours'));

        if (findUsSnap.exists()) setFindUs(findUsSnap.data());
        if (hoursSnap.exists()) setHours(hoursSnap.data());
      } catch (err) {
        console.error('Error fetching contact info:', err);
        window.toastify('Failed to load contact information', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }
  // **********************END FIND US AND HOURS ************************

  // ***************************MAP DYNAMICALLY************************
  const location1 = findUs?.location1 || '445 Mount Eden Road, Mount Eden';
  // const location1 = findUs?.location1 || "445 Mount Eden Road, Mount Eden";
  

  return (
    <>
      {/* header */}
      <TopBar />
      <SecondHeader />
      {/* body */}
      <div className="container-fluid">
        <div className="row">
          {/* map/location */}
          <div className="col-12 col-lg-6 mx-0 px-0" style={{ minHeight: '400px' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {location1 ? (
                <iframe
                  key={location1} // important: force re-render on change
                  title={`Map of ${location1}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(location1)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <p className="text-danger text-center">Map location not found.</p>
              )}
            </div>
          </div>



          <div className="col-12 col-lg-6">
            <div className="container mb-5">
              <div className="row mt-5 pt-lg-5">
                <div className="col-12 col-lg-6">
                  <div className="card bg-light py-3 px-3 border-0" style={{ position: 'relative' }}>
                    <i className="fa-solid fa-location-dot mt-3 mt-lg-0" style={{ position: 'absolute', top: '1rem', right: '40px', zIndex: 0, fontSize: '80px', opacity: 0.1 }}></i>
                    <h5 style={{ fontFamily: 'fantasy' }}>Find Us</h5>
                    <p className='fw-semibold me-3 mt-3 text-secondary location1'>{findUs?.location1 || '-'}</p>
                    {findUs?.location2 && (
                      <p className='fw-semibold me-3 text-secondary location2'>
                        {findUs.location2}
                        <br className='d-none d-lg-block' />
                      </p>
                    )}
                    <p className='fw-semibold me-3 text-secondary phone'>{findUs?.phone || '-'}</p>
                    <p className='fw-semibold me-3 text-secondary email'>{findUs?.email || '-'}</p>
                  </div>
                </div>

                <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                  <div className="card bg-light py-3 px-3 border-0" style={{ position: 'relative' }}>
                    <i className="fa-solid fa-computer mt-3 mt-lg-0" style={{ position: 'absolute', top: '1rem', right: '40px', zIndex: 0, fontSize: '80px', opacity: 0.1 }}></i>
                    <h5 style={{ fontFamily: 'fantasy' }}>Opening Hours</h5>
                    {/* show hours */}
                    {(() => {
                      if (!hours) return null;

                      const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

                      // Map to hold each day's time
                      const dayTimeMap = weekDays.map(day => ({ day, time: hours[day] || '' }));

                      // Group consecutive days with same time
                      const groups = [];
                      let currentGroup = [];

                      dayTimeMap.forEach((entry, idx) => {
                        if (currentGroup.length === 0) {
                          currentGroup.push(entry);
                        } else {
                          const last = currentGroup[currentGroup.length - 1];
                          if (entry.time === last.time) {
                            currentGroup.push(entry);
                          } else {
                            groups.push([...currentGroup]);
                            currentGroup = [entry];
                          }
                        }
                      });

                      if (currentGroup.length) groups.push(currentGroup);

                      return groups.map((group, index) => {
                        const time = group[0].time;
                        const dayStart = group[0].day;
                        const dayEnd = group[group.length - 1].day;
                        const label = group.length === 1 ? dayStart : `${dayStart} - ${dayEnd}`;

                        return (
                          <p key={index} className="fw-semibold me-3 text-secondary">
                            {label}: {time}
                          </p>
                        );
                      });
                    })()}


                  </div>
                </div>


              </div>
              <div className="row mt-5 pt-3">
                <div className="col-12">

                  <h1 style={{ fontFamily: 'fantasy' }}>Send us a Message</h1>
                  <p style={{ fontSize: '18px' }}>We’d love to hear from you! Whether you have a question, feedback feel free to reach out. Our team is always here to assist you and ensure you have a great experience. Simply fill out the form below, and we’ll get back to you as soon as possible.</p>
                  <form className="form mb-4" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 col-md-6 mt-3">
                        <input type="text" placeholder='First Name  ' name='firstName' className='form-control py-2' value={state.firstName} onChange={handleChange} />
                      </div>
                      <div className="col-12 col-md-6 mt-3">
                        <input type="text" placeholder='Last Name ' name='lastName' className='form-control py-2' value={state.lastName} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 mt-3">
                      <input type="email" placeholder='Email Adress ' name='email' className='form-control py-2' value={state.email} onChange={handleChange} />

                    </div>
                    <div className="col-12 mt-3">
                      <input type="text" placeholder='Subject ' name='subject' className='form-control py-2' value={state.subject} onChange={handleChange} />

                    </div>
                    <div className="col-12 mt-3">
                      <textarea type="text" rows='2' placeholder='Type Your Message ' name='message' className='form-control py-2' value={state.message} onChange={handleChange} />

                    </div>
                    <div className="col-12 my-2 ">
                      <button className=" zoom-button  py-3 px-4 bg-danger fw-semibold mt-4  " disabled={isProcessing} style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                        {!isProcessing ? "SEND MESSAGE" : <div className='mx-5 spinner spinner-border spinner-border-sm'></div>}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <DarkFooter />
      {/* </div> */}
    </>
  )
}
