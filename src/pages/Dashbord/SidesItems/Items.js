// import { Link } from "react-router-dom";
// import {AiFillDashboard,AiOutlineTeam} from 'react-icons/ai'
// import {CgProfile} from 'react-icons/cg'
// import {FaShippingFast} from 'react-icons/fa'
// import {PiUsersFourBold} from 'react-icons/pi'
// import {BiLogoProductHunt} from 'react-icons/bi'
// import {BsPlusLg} from 'react-icons/bs'
// import {MdShoppingCart} from 'react-icons/md'
// import {TiMessages} from 'react-icons/ti'
// import {BiLogOutCircle} from 'react-icons/bi'
// import swal from "sweetalert";
// import { signOut } from "firebase/auth";
// import { AuthContext } from "../../../context/AuthContext";
// import { useContext } from "react";
// import { auth } from "../../../config/firebase";

// const getRandomId = () => Math.random().toString(36).slice(2)
// // const { isAuthenticated, dispatch } = useContext(AuthContext)

//   // --------authentication-----------
//   // const handleLogout = () => {
//   //   swal({
//   //     title: "Logout!",
//   //   text: "Are you sure?",
//   //   icon: "warning",
//   //   buttons: ["cancel", "Logout"],
//   //   // buttons: true,
//   //   dangerMode: true,
//   // })
//   //   .then((willDelete) => {
//   //     if (willDelete) {
//   //       // .then(()=>{
//   //       signOut(auth)
//   //       dispatch({ type: "LOGOUT" })
//   //       // alert("loged ")
//   //       // window.toastify("Loged out successfully","success")
//   //       swal("Loged out successfully", {
//   //         icon: "success", buttons: false, timer: 2000,
//   //       });
//   //       // })
        
//   //     }
//   //   })
//   //   .catch((err) => {
//   //     console.error(err)
//   //     window.toastify("Something went wrong while loged out", "error")
//   //   })
//   // }
// export const items = [
//     {
//       key: getRandomId(),
//       icon: <AiFillDashboard style={{fontSize:'20px'}} />,
//       label: <Link to='/dashbord/home' className='text-decoration-none'>Home</Link>,
//     },
//     {
//       key: getRandomId(),
//       icon: <CgProfile  style={{fontSize:'20px'}}/>,
//       label: <Link to='/dashbord/home/profile' className='text-decoration-none'>Profile</Link>,
//     },
//     {
//       key: getRandomId(),
//       icon: <AiOutlineTeam style={{fontSize:'20px'}} />,
//       label: <Link to='/dashbord/home/team' className='text-decoration-none'>Team</Link>,
//     },
//     {
//       key: getRandomId(),
//       icon: <FaShippingFast style={{fontSize:'20px'}}/>,
//       label: <Link to='/dashbord/home/orders' className='text-decoration-none'>Orders</Link>,
//     },
//     {
//       key: getRandomId(),
  
//       icon: <PiUsersFourBold style={{fontSize:'20px'}} />,
//       label: <Link to='/dashbord/home/users' className='text-decoration-none'>Users</Link>,
//     },
//     {
//       key: getRandomId(),
//       icon: <BiLogoProductHunt style={{fontSize:'20px'}} />,
//       label: 'Products',
//       children: [
//         {
//           key: getRandomId(),
//           icon: <BsPlusLg style={{fontSize:'20px'}}/>,
//           label: <Link to="/dashbord/home/addProducts" className='text-decoration-none'>Add Products</Link>
//         },
//         {
//         //   key: getRandomId(),
//           icon: <MdShoppingCart style={{fontSize:'20px'}}/>,
//           label: <Link to="/dashbord/home/allProducts" className='text-decoration-none'>All Products </Link>
//         },
//       ]
//     },
//     {
//     //   key: getRandomId(),
//       icon: <TiMessages style={{fontSize:'20px'}}/>,
//       label: <Link to='/dashbord/home/messages' className='text-decoration-none'>Messages</Link>,
//     },
//     // {
//     // //   key: getRandomId(),
//     //   icon: <BiLogOutCircle style={{fontSize:'20px'}}/>,
//     //   label: <Link    className=' text-decoration-none 'onClick={handleLogout}>Logout</Link>,
//     //   // onclick:{handleLogout},
//     // },
//   ];
