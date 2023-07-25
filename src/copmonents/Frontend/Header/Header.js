import React, { useContext } from 'react'
import { BsHandbag } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';
// import { RxAvatar } from 'react-icons/rx';\
import { UserOutlined } from '@ant-design/icons';
import darkLight from '../../../assets/logoDark.png';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext';
import swal from 'sweetalert';
import { signOut } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { Avatar, Dropdown } from 'antd';
import { CartState } from '../../../context/CartContext';

export default function Header() {
  // --------cart---------
  const { state: { cart } } = CartState()



  // --------authentication-----------
  const { isAuthenticated, dispatch } = useContext(AuthContext)
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
        <a target="_blank" rel="noopener noreferrer" className='text-decoration-none' href="https://www.antgroup.com">
          Profile
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" className='text-decoration-none' href="https://www.aliyun.com">
          My Order
        </a>
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
    <div className="Navbar">

      <nav className="navbar navbar-expand-lg py-0 shadow-sm  ">
        <div className="container-fluid px-0 py-0 my-0 ">
          <a className="navbar-brand mx-0 mx-lg-4  px-0" ><img className='img-fluid ps-2 py-1  ' src={darkLight} alt="" /></a>
          <div className="d-flex  justify-content-end  d-sm-block d-lg-none  ">

            <Link to='/cart' className='btn py-0 px-0 mx-0 position-relative' >
              <span style={{ fontSize: '20px' }}>

              <BsHandbag />
              </span>
            {/* <span className="badge badge-danger text-danger  mb-1 px-0">0</span> */}
            <span style={{ fontSize: '9px' }} class="position-absolute top-0 mt-2 start-100 translate-middle badge rounded-pill  fw-light bg-danger text-white">
                      {cart.length}
                     
                    </span>
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
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar
                      size={35} // Adjust the size of the avatar as per your requirement
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      icon={<UserOutlined />} // Fallback icon when the user is not logged in
                      alt="Default Avatar"
                    />
                  </a>
                </Dropdown>
              </>
            }

          </div>

          <button className="navbar-toggler mx-0 ps-0 pe-2 border-0 btn " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon  px-0 mx-0"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fw-semibold mx-lg-2" aria-current="page" to='/'>Home</Link>
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
              <li className="nav-item">
                <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/checkout'>Check Out</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link  fw-semibold mx-lg-2" aria-current="page" to='/cards-local'>Cards Local</Link>
              </li>
            </ul>
            <ul className=' my-0 py-0'>

              <div className="  d-none d-lg-flex  my-0 py-0">
                {/* <div className="btn btn-danger rounded-0 py-4 px-3 fw-bold   " style={{fontSize:'21px'}}> <span className='mt-1 d-inline-block'>Order Now</span> </div> */}
                <div className=" bg-danger  py-4  f px-3">
                  <Link to='/cart' className='bg-transparent border-0 mx-3  btnNav position-relative '  >
                    <span style={{ fontSize: '27px' }}>
                      <BsHandbag />
                    </span>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill ps-2 bg-white text-danger">
                      {cart.length}
                     
                    </span>
                    {/* <span className="badge  text-danger border fw-bold  py-1 bg-white px-1">{cart.length}</span> */}
                  </Link>
                  {!isAuthenticated
                    ?
                    <>
                      <Link to="/auth/login" className='bg-transparent  border-0 mx-2 btnNav fw-bold' style={{ fontSize: '25px' }}><BiLogInCircle /></Link>
                    </>
                    : <>
                      <Dropdown className='d-inline-block'
                        menu={{
                          items,
                        }}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Avatar
                            size={40} // Adjust the size of the avatar as per your requirement
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            icon={<UserOutlined />} // Fallback icon when the user is not logged in
                            alt="Default Avatar"
                          />
                        </a>
                      </Dropdown>
                    </>
                  }

                </div>
              </div>

            </ul>
          </div>
        </div>
      </nav>
    </div>

  )
}
