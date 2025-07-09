import React, { useContext, useState } from 'react'
import SecondHeader from '../../copmonents/Frontend/SecondHeader/SecondHeader'
import TopBar from '../../copmonents/Frontend/TopBar/TopBar'
import DarkFooter from '../../copmonents/Frontend/DarkFooter'
import { Link } from 'react-router-dom'
import { auth, firestore } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";

// assets
import leafBack from '../../assets/leafBack.png'
import pizzaBack from '../../assets/Barbeque-Chicken.png'


const initialState = {
  username:'',
  email: "",
  password: "",
};
export default function Register() {
  const { dispatch } = useContext(AuthContext)
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsprocessing] = useState(false);
  // ---handleChange----------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((s) => ({ ...s, [name]: value }));
  };
  // ---handleSubmit----------
  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password, confirmPassword } = state;

    console.log(email, password, confirmPassword);
    if (!window.isEmail(email)) {
      return window.toastify('Enter Your Email Correctly', 'error')
    }
    if (!password.length) {
      return window.toastify("Please enter the password", "error");
    }
    if (password.length < 6) {
      return window.toastify("Password Should be atleast 6 Character", "error");
    }
    // if (confirmPassword !== password) {
    //   return window.toastify("Password doesn't match", "error");
    // }
    setIsprocessing(true);
    // here will be the code of firebase start

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log("user created")
        addDocument(user);
        console.log(user);
        // ...
      })
      .catch((error) => {
        window.toastify("Some thing wronge while creating user", "error");
        console.log(error);
        setIsprocessing(false);
      })
    //firebase close
    // .finally(() => {
    //   setIsprocessing(false);
    // });
  };


  // Add Documents-----------
  const addDocument = async (user) => {
    //async() me user to use krna ha warna user.uid nhi mily gi
    try {
      // Add a new document in collection "cities"
      await setDoc(doc(firestore, "users", user.uid,), {
        fullName: '',
        email: user.email,
        number:'',
        city:'',
        address:'',
        profession:'',
        bio:'',
        image:'',
        // passWord:user.password,
        uid: user.uid,
        role: "user",
        status:'active',
        dateCreated:serverTimestamp(),
      });
      // window.toastify("A new Doc has been added successfully", "success");
      console.log('doc created')
      dispatch({ type: "LOGIN", payload: { user } })
      window.toastify("You are registered successfully", "success");

    }
    catch (error) {
      console.log(error)
      window.toastify("Some thing wronge while creating Doc", "error");
    }
    setIsprocessing(false);

  };

  return (
    <>
      {/* header */}
      <TopBar />
      <SecondHeader />
      {/* main */}
      <div className="container-fluid pt-3  " style={{ position: 'relative', overflow: 'hidden' }}   >
        <div className="container ">

          <img className='d-none d-lg-block' style={{ position: 'absolute', left: '-80px', top: '150px', zIndex: -1, }} src={leafBack} alt="" />
          {/* <img className='d-none d-lg-block ' style={{position:'absolute',right:'-90px',bottom:'-350px',zIndex:-1, overflow:'hidden'}} src={pizzaBack} alt="" /> */}

          <div className="row py-5 px-2  ">
            <div className="col-12 col-lg-6 loginBack shadow-sm d-flex flex-column justify-content-center align-items-center text-white ">
              <i class="fa-solid fa-pepper-hot pt-5 " style={{ fontSize: '40px' }}></i>
              <h1 className='pt-5 pb-4' style={{ fontFamily: 'fantasy' }}>Welcome Back!</h1>
              <p className='px-md-5 mx-md-5 mx-lg-0 text-center pb-3' style={{ fontSize: '18px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="col-12 col-lg-6 bg-light shadow-sm">
              <div className="row pt-5 px-2 px-md-5 ">
                <div className="col-12 text-center ">

                  <h1 className='' style={{ fontFamily: 'fantasy' }}>Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row py-5">
                    <div className="col-12">

                      <input type="text" placeholder='Username' className='form-control  py-2' name='username' onChange={handleChange} />
                    </div>
                    <div className="col-12">

                      <input type="email" placeholder='Email' className='form-control  py-2 mt-4' name='email' onChange={handleChange} />
                    </div>
                    <div className="col-12">

                      <input type="password" placeholder='Password' className='form-control  py-2 mt-4' name='password' onChange={handleChange} />
                    </div>
                    {/* <div className="col-12 mt-3 text-center ">
                    <Link className='text-dark'>Forgot Password?</Link>
                  </div> */}
                    <div className="col-12 mt-4 text-center ">
                      <button className=" zoom-button  py-md-3 px-4 px-lg-5 bg-danger fw-semibold  " disabled={isProcessing} style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                        {!isProcessing ? (
                          <span>REGISTER</span>
                        ) : (
                          <div className="spinner spinner-grow spinner-grow-sm"></div>
                        )}
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

                    <p className='text-center text-secondary pt-3'>Already Have An Account?<Link to="/auth/login" className='text-dark'>Login</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <img className='d-none d-lg-block ' style={{ position: 'absolute', right: '-60px', bottom: '-110px', zIndex: -1, }} src={pizzaBack} alt="" />

        </div>
      </div>
      {/* footer */}
      <DarkFooter />
    </>
  )
}
