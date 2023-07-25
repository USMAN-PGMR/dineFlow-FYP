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

const getRandomId = () => Math.random().toString(36).slice(2)

export const items = [
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
      icon: <AiOutlineTeam style={{fontSize:'20px'}} />,
      label: <Link to='/dashbord/home/team' className='text-decoration-none'>Team</Link>,
    },
    {
      key: getRandomId(),
      icon: <FaShippingFast style={{fontSize:'20px'}}/>,
      label: <Link to='/dashbord/home/orders' className='text-decoration-none'>Orders</Link>,
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
      icon: <TiMessages style={{fontSize:'20px'}}/>,
      label: <Link to='/dashbord/home/messages' className='text-decoration-none'>Messages</Link>,
    },
    {
    //   key: getRandomId(),
      icon: <BiLogOutCircle style={{fontSize:'20px'}}/>,
      label: <Link to='/dashbord/home/logout'   className=' text-decoration-none '>Logout</Link>,
    },
  ];