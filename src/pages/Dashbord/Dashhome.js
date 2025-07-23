import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import {AiFillDashboard,AiOutlineTeam} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {FaShippingFast} from 'react-icons/fa'
import {PiUsersFourBold} from 'react-icons/pi'
import {BiLogoProductHunt} from 'react-icons/bi'
import {BsPlusLg} from 'react-icons/bs'
import {MdShoppingCart} from 'react-icons/md'
import {TiMessages} from 'react-icons/ti'
import {BiLogOutCircle} from 'react-icons/bi'
import { MdContactPhone } from "react-icons/md";
import { FaHireAHelper } from "react-icons/fa6";
import { TbTestPipe } from "react-icons/tb";
import { FaQuoteLeft } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";


// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Profile from '../../copmonents/Dashbord/Profile';
import { items } from './SidesItems/Items';
import  Routes  from './Routes';
import swal from 'sweetalert';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
const { Header, Content, Footer, Sider } = Layout;

export default function Dashhome() {

const { isAuthenticated, dispatch } = useContext(AuthContext)

  // --------authentication-----------
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
const getRandomId = () => Math.random().toString(36).slice(2)

  const items = [
    {
      key: getRandomId(),
      icon: <AiFillDashboard style={{fontSize:'20px'}} />,
      label: <Link to='/dashbord/home' className='text-decoration-none'>Home</Link>,
    },
    {
      key: getRandomId(),
      icon: <CgProfile  style={{fontSize:'20px'}}/>,
      label: <Link to='/dashbord/home/profile' className='text-decoration-none'>Profile</Link>,
    },
    {
      key: getRandomId(),
      icon: <MdContactPhone style={{fontSize:'20px'}} />,
      label: <Link to='/dashbord/home/contactManage' className='text-decoration-none'>General Settings</Link>,
    },
    {
      key: getRandomId(),
      icon: <AiOutlineTeam style={{fontSize:'20px'}} />,
      label: <Link to='/dashbord/home/team' className='text-decoration-none'>Team</Link>,
    },
    {
      key: getRandomId(),
      icon: <FaShippingFast style={{fontSize:'20px'}}/>,
      label: <Link to='/dashbord/home/orders' className='text-decoration-none'>Manage Orders</Link>,
    },
    {
      key: getRandomId(),
      icon: <FaHireAHelper style={{fontSize:'20px'}} />,
      label: 'Manage Jobs',
      children: [
        {
          key: getRandomId(),
          icon: <BsPlusLg style={{fontSize:'20px'}}/>,
          label: <Link to="/dashbord/home/addJob" className='text-decoration-none'>Add Job</Link>
        },
        {
        //   key: getRandomId(),
          icon: <FaEye style={{fontSize:'20px'}}/>,
          label: <Link to="/dashbord/home/viewApplicant" className='text-decoration-none'>View Applicant </Link>
        },
      ]
    },
    
    {
      key: getRandomId(),
  
      icon: <PiUsersFourBold style={{fontSize:'20px'}} />,
      label: <Link to='/dashbord/home/users' className='text-decoration-none'>Users</Link>,
    },
    {
      key: getRandomId(),
      icon: <BiLogoProductHunt style={{fontSize:'20px'}} />,
      label: 'Products',
      children: [
        {
          key: getRandomId(),
          icon: <BsPlusLg style={{fontSize:'20px'}}/>,
          label: <Link to="/dashbord/home/addProducts" className='text-decoration-none'>Add Products</Link>
        },
        {
        //   key: getRandomId(),
          icon: <MdShoppingCart style={{fontSize:'20px'}}/>,
          label: <Link to="/dashbord/home/allProducts" className='text-decoration-none'>All Products </Link>
        },
      ]
    },
    {
    //   key: getRandomId(),
      icon: <FaQuoteLeft style={{fontSize:'20px'}}/>,
      label: <Link to='/dashbord/home/faqs' className='text-decoration-none'>FAQ'S</Link>,
    },
    {
    //   key: getRandomId(),
      icon: <TiMessages style={{fontSize:'20px'}}/>,
      label: <Link to='/dashbord/home/messages' className='text-decoration-none'>Messages</Link>,
    },
    {
    //   key: getRandomId(),
      icon: <TbTestPipe style={{fontSize:'20px'}}/>,
      label: <Link to='/dashbord/home/testimonial' className='text-decoration-none'>Testimonials</Link>,
    },
    {
    //   key: getRandomId(),
      icon: <BiLogOutCircle style={{fontSize:'20px'}}/>,
      label: <Link    className=' text-decoration-none 'onClick={handleLogout}>Logout</Link>,
      // onclick:{handleLogout},
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider className='text-white'
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Profile/>
        <Menu
        className=''
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={['4']}
          items={items}
        />
       
      </Sider>
      <Layout>
        <Header
            theme="dark" 
            className='text-white pt-3 ps-3'
        >
          <h4>Dashboard</h4>
          </Header>
        <Content className='d-block'
          
        >
          <Routes/>
         
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background:'#001529',
            color:'white',
            padding:10,
          }}
        >
           ©2025 Powered By Muhammad Usman Ali
        </Footer>
      </Layout>
    </Layout>
  );
}
