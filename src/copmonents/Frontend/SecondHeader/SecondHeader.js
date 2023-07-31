import React, { useContext } from 'react'
import { IoIosSearch } from 'react-icons/io';
import { BsHandbag } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { BiLogInCircle } from 'react-icons/bi';
import swal from 'sweetalert';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { AuthContext } from '../../../context/AuthContext';
import { CartState } from '../../../context/CartContext';





export default function SecondHeader() {
  // cart
  const { state: { cart } } = CartState()
  const { isAuthenticated, dispatch } = useContext(AuthContext)
  // ---Dashbord
  const { userInfo } = useContext(AuthContext)

  const handleLogout = () => {
    swal({
      title: "Logout!",
      text: "Are you sure?",
      icon: "warning",
      buttons: ["cancel", "Logout"],
      // buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // .then(()=>{
          signOut(auth)
          dispatch({ type: "LOGOUT" })
          // alert("loged ")
          // window.toastify("Loged out successfully","success")
          swal("Loged out successfully", {
            icon: "success", buttons: false, timer: 2000,
          });
          // })

        }
      })
      .catch((err) => {
        console.error(err)
        window.toastify("Something went wrong while loged out", "error")
      })
  }

  const items = [
    {
      label: (
        <Link to='/UserProfile' rel="noopener noreferrer" className='text-decoration-none' href="https://www.antgroup.com">
          Profile
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <Link to='/my-order' rel="noopener noreferrer" className='text-decoration-none' href="https://www.aliyun.com">
          My Order
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <button target="_blank" rel="noopener noreferrer" className='border-0 bg-transparent' onClick={handleLogout} href="https://www.aliyun.com">
          Logout
        </button>
      ),
      key: '2',
    },
  ];
  return (
    <div className="secondHeader">


      <nav className="navbar secondNav navbar-expand-lg py-0  bg-transparent  ">
        <div className="container px-0 py-0 my-0 ">
          <a className="navbar-brand mx-0   px-0" ><img className='w-75 ps-2 py-1  ' src="http://androthemes.com/themes/react/slices/assets/img/logo.png" alt="" /></a>
          {/* only on small screen */}
          <div className="d-column align-items-end  justify-content-end  d-sm-block d-lg-none  ">

            <Link to='/cart' className='btn py-0 px-0 mx-0 position-relative' >
              <span style={{ fontSize: '20px' }}>

                <BsHandbag />
              </span>
              {cart.length > 0 && (
                <span
                  style={{ fontSize: '9px' }}
                  className="position-absolute top-0 mt-2 start-100 translate-middle badge rounded-pill fw-light bg-danger text-white"
                >
                  {cart.length}
                </span>
              )}
            </Link>
            {/* <i className='btn py-0  pe-0 ps-3   mx-0' style={{ fontSize: '20px' }}><  BiLogInCircle /></i> */}
            {!isAuthenticated
              ?
              <>
                <Link to="/auth/login" className='py-0  pe-0 ps-3 text-dark   mx-0' style={{ fontSize: '22px' }}><BiLogInCircle /></Link>
              </>
              : <>
                <Dropdown className='d-inline-block ps-2' style={{ fontSize: '10px' }}
                  menu={{
                    items,
                  }}
                >
                  <Link onClick={(e) => e.preventDefault()}>
                    {userInfo && userInfo.image ? ( // Check if the user's image is available
                      <img
                        className=''
                        src={userInfo.image} // Display the user's image
                        alt="User Avatar"
                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                      />
                    ) : (
                      <Avatar
                        size={32} // Adjust the size of the avatar as per your requirement
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        icon={<UserOutlined />} // Fallback icon when the user is not logged in
                        alt="Default Avatar"
                      />
                    )}
                  </Link>
                </Dropdown>
              </>
            }
          </div>

          <button className="navbar-toggler  border-0 btn " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon  px-0 mx-0"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto   mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link className="nav-link   fw-semibold mx-lg-2" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/about'>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/contact'>Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/auth/login'>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/auth/register'>Register</Link>
              </li>
              {userInfo && userInfo.role == "admin" ?
                <li className="nav-item">
                  <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/dashbord/home'>Dashboard</Link>
                </li> : ''}
            </ul>
            <ul className=' my-0 py-0'>

              {/* <form className="d-flex bg-dark " role="search"> */}
              <div className="  d-none d-lg-flex  my-0 py-0">
                {/* <div className="btn btn-danger rounded-0 py-4 px-3 fw-bold   " style={{fontSize:'21px'}}> <span className='mt-1 d-inline-block'>Order Now</span> </div> */}
                <div className="   py-4  fw-bolder px-2">


                  <Link to='/cart' className='bg-transparent border-0 px-3 pt-1 border btnNav text-dark position-relative' >
                    <span style={{ fontSize: '26px' }}>

                      <BsHandbag className='mt-1' />
                    </span>
                    {/* <span className="badge badge-danger text-danger  mb-1 px-0">0</span> */}
                    {cart.length > 0 && (
                      <span
                        style={{ fontSize: '9px' }}
                        className="position-absolute top-0 mt-2  translate-middle badge rounded-pill fw-light bg-danger text-white"
                      >
                        {cart.length}
                      </span>
                    )}
                  </Link>
                  {/* <i className='btn py-0  pe-0 ps-3   mx-0' style={{ fontSize: '20px' }}><  BiLogInCircle /></i> */}
                  {!isAuthenticated
                    ?
                    <>
                      <Link to="/auth/login" className='bg-transparent  border-0 px-2 btnNav text-dark' style={{ fontSize: '25px' }}><BiLogInCircle /></Link>
                    </>
                    : <>
                      <Dropdown className='d-inline-block'
                        menu={{
                          items,
                        }}
                      >
                        <Link onClick={(e) => e.preventDefault()}>
                          {userInfo && userInfo.image ? ( // Check if the user's image is available
                            <img
                              className='mb-1'
                              src={userInfo.image} // Display the user's image
                              alt="User Avatar"
                              style={{ width: '34px', height: '34px', borderRadius: '50%' }}
                            />
                          ) : (
                            <Avatar
                              size={38} // Adjust the size of the avatar as per your requirement
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              icon={<UserOutlined />} // Fallback icon when the user is not logged in
                              alt="Default Avatar"
                            />
                          )}
                        </Link>
                      </Dropdown>
                    </>
                  }
                </div>
              </div>
              {/* <div className="bg-danger  d-none d-lg-inlineblock  my-0 py-0">
            <div className="btn py-4 text-white fw-bolder">Order Now</div>
          </div> */}
              {/* </form> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
