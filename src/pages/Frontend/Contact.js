import React, { useState } from 'react'
import SecondHeader from '../../copmonents/Frontend/SecondHeader/SecondHeader'
import TopBar from '../../copmonents/Frontend/TopBar/TopBar'
import DarkFooter from '../../copmonents/Frontend/DarkFooter'
import { firestore } from '../../config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'



const initialState = {
  firstName:"",
  lastName:"",
  email:"",
  subject:"",
  message:""

}
export default function Contact() {
  const [state, setState] = useState(initialState)
  const [isProcessing, setisProcessing] = useState(false)

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  // ----------Handle Submit---------
  const handleSubmit = e => {
    e.preventDefault();

    let { firstName,lastName,email,subject,message } = state

   firstName =firstName.trim()
   lastName =lastName.trim()
   email =email.trim()
   subject =subject.trim()
   message =message.trim()


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

    let Messages = { firstName,lastName,email,subject,message}

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
  return (
    <>
      {/* header */}
      <TopBar />
      <SecondHeader />
      {/* body */}
      <div className="container-fluid">
        <div className="row">
          {/* map/location */}
        <div className="col-12 col-lg-6  mx-0 px-0" style={{minHeight:'400px'}}>
  <div className="mapouter" style={{ height: '100%' }}>
    <div className="gmap_canvas" style={{ height: '100%' }}>
      <iframe
        className="gmap_iframe"
        frameBorder={0}
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src="https://maps.google.com/maps?width=100%&height=100%&hl=en&q=445 Mount Eden Road, Mount Eden&t=&z=14&ie=UTF8&iwloc=B&output=embed"
      />
      <a href="https://thepasswordgame.com/">The Password Game</a>
    </div>
    <style
      dangerouslySetInnerHTML={{
        __html:
          ".mapouter{position:relative;text-align:right;width:100%;height:100%;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:100%;}.gmap_iframe {width:100%!important;height:100%!important;}"
      }}
    />
  </div>
</div>

          <div className="col-12 col-lg-6">
            <div className="container mb-5">
              <div className="row mt-5 pt-lg-5">
                <div className="col-12 col-lg-6">
                  <div className="card bg-light py-3 px-3 border-0" style={{ position: 'relative' }}>
                    <i className="fa-solid fa-location-dot mt-3 mt-lg-0" style={{ position: 'absolute', top: '1rem', right: '40px', zIndex: 0, fontSize: '80px', opacity: 0.1 }}></i>
                    <h5 style={{ fontFamily: 'fantasy' }}>Find Us</h5>
                    <p className='fw-semibold me-3 mt-3 text-secondary'>445 Mount Eden Road, Mount Eden</p>
                    <p className='fw-semibold me-3  text-secondary'>21 Greens Road RD 2 Ruawai <br className='d-none d-lg-block' /> 0592</p>
                    <p className='fw-semibold me-3 text-secondary'>+123 456 789</p>
                    <p className='fw-semibold me-3 text-secondary'>info@example.com</p>

                  </div>

                </div>
                <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                  <div className="card bg-light py-3 px-3 border-0" style={{ position: 'relative' }}>
                    <i className="fa-solid fa-computer mt-3 mt-lg-0" style={{ position: 'absolute', top: '1rem', right: '40px', zIndex: 0, fontSize: '80px', opacity: 0.1 }}></i>
                    <h5 style={{ fontFamily: 'fantasy' }}>Opening Hours</h5>
                    <p className='fw-semibold me-3 mt-3 text-secondary'>Mon - Wed: 8:00am - 8:00pm</p>
                    <p className='fw-semibold me-3  text-secondary'>Thu: 8:00am - 5:00pm</p>
                    <p className='fw-semibold me-3 text-secondary'>Fri: 8:00am - 8:00pm</p>
                    <p className='fw-semibold me-3 text-secondary'>Sat - Sun: 8:00am - 2:00pm</p>
                    {/* <p className='fw-semibold me-3 text-secondary'>info@example.com</p> */}

                  </div>

                </div>

              </div>
              <div className="row mt-5 pt-3">
                <div className="col-12">

                  <h1 style={{ fontFamily: 'fantasy' }}>Send us a Message</h1>
                  <p style={{ fontSize: '18px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. There are many variations of passages</p>
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
                      <input type="email" placeholder='Email Adress ' name='email' className='form-control py-2' value={state.email} onChange={handleChange}/>

                    </div>
                    <div className="col-12 mt-3">
                      <input type="text" placeholder='Subject ' name='subject' className='form-control py-2' value={state.subject} onChange={handleChange}/>

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
      

      <DarkFooter/>
      {/* </div> */}
    </>
  )
}
