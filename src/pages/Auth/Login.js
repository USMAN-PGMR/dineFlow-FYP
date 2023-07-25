// import React from 'react'
import TopBar from '../../copmonents/Frontend/TopBar';
import SecondHeader from '../../copmonents/Frontend/SecondHeader';
// import { Link } from 'react-router-dom';
import DarkFooter from '../../copmonents/Frontend/DarkFooter';
import {  signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import { auth } from '../../config/firebase';
// assets
import leafBack from '../../assets/leafBack.png'
import pizzaBack from '../../assets/Barbeque-Chicken.png'


const initialState={
  email:"",
  password:""
}
export default function Login() {
  const dispatch=useContext(AuthContext)
  const navigate=useNavigate()
  
  const [state,setState]=useState(initialState)
  const [isProcessing,setIsprocessing]=useState(false)


  const handleChange=e=>{
    
    const {name,value}=e.target
    
    setState(s=>({...s,[name]:value}))
    // OR 
    // setState(s=>({...s,[e.target.name]:e.target.value}))
  }
  // ---handleSubmit----------
  const handleSubmit=e=>{
    e.preventDefault()
    let {email,password}=state
    
    console.log(email,password)
    
    setIsprocessing(true)
    // here will be the code of firebase start
    
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.toastify("Loged in successfully","success");
    console.log(user.uid)
    dispatch({type:"LOGIN",payload:{user}})
    navigate("/dashboard/home")
    // ...
  })
  .catch((error) => {
    // window.toastify("Some thing wronge while creating user","error");
    console.log(error)
  })
//firebase close
.finally(()=>{
  setIsprocessing(false)

})

}
  return (
    <>
      {/* header */}
      <TopBar />
      <SecondHeader />
      {/* main */}
      <div className="container-fluid pt-3" style={{position:'relative',overflow:'hidden'}}  >
        <div className="container">

        <img className='d-none d-lg-block' style={{position:'absolute',left:'-80px',top:'150px',zIndex:-1,}} src={leafBack} alt="" />
        <img className='d-none d-lg-block ' style={{position:'absolute',right:'-60px',bottom:'-110px',zIndex:-1,}} src={pizzaBack} alt="" />
       
        <div className="row py-5 px-2  ">
          <div className="col-12 col-lg-6 loginBack shadow-sm d-flex flex-column justify-content-center align-items-center text-white ">
            <i class="fa-solid fa-pepper-hot pt-5 " style={{ fontSize: '40px' }}></i>
            <h1 className='pt-5 pb-4' style={{ fontFamily: 'fantasy' }}>Welcome Back!</h1>
            <p className='px-md-5 mx-md-5 mx-lg-0 text-center pb-3' style={{ fontSize: '18px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="col-12 col-lg-6 bg-light shadow-sm">
            <div className="row pt-5 px-2 px-md-5 ">
              <div className="col-12 text-center ">

                <h1 className='' style={{ fontFamily: 'fantasy' }}>Log in</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row py-5">
                  <div className="col-12">

                    <input type="email" placeholder='Email' className='form-control  py-2' name='email'  onChange={handleChange} />
                  </div>
                  <div className="col-12">

                    <input type="password" placeholder='Password' className='form-control  py-2 mt-4' name='password'  onChange={handleChange} />
                  </div>
                  <div className="col-12 mt-3 text-center ">
                    <Link className='text-dark'>Forgot Password?</Link>
                  </div>
                  <div className="col-12 mt-4 text-center ">
                    <button className=" zoom-button  py-md-3 px-5 bg-danger fw-semibold  " disabled={isProcessing} style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                    {!isProcessing
                    ?<span>LOGIN</span>
                    : <div className="spinner spinner-grow spinner-grow-sm"></div>
                  }
                      {/* <span className="zoom-overlay"></span> */}
                    </button>
                  </div>
                  <div className="col-5 mt-4">
                    <hr />

                  </div>
                  <div className="col-2 text-center text-secondary mt-4">
                    <p>OR</p>

                  </div>
                  <div className="col-5 mt-4">
                    <hr />

                  </div>
                  <div className="col-12">

                    <button className='  btn w-100 rounded-1 py-2 facebook d-inline-block my-2 fw-semibold '><i className="fa-brands  fa-facebook-f pe-2"> </i> Continue With Facebook</button>
                  </div>
                  <div className="col-12">

                    <button className='  btn w-100 rounded-1  d-inline-block google py-2  fw-semibold  '><i className="fa-brands fa-google pe-2"></i> Continue With Google</button>
                  </div>

                  <p className='text-center text-secondary pt-3'>Donn't Have An Account?<Link to="/auth/register" className='text-dark'>Create One</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>

        </div>
      </div>
      {/* footer */}
      <DarkFooter />
    </>
  )
}
