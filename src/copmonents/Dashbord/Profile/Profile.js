import React, { useContext } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import profileImg from '../../../assets/team4.jpg'
import { AuthContext } from '../../../context/AuthContext';

export default function Profile() {
  const { userInfo } = useContext(AuthContext)

  return (
    <div className="container  text-center py-3">
      <div className="row">
        <div className="col-12 text-center mx-auto  ">
          {/* <img src={profileImg} className='img-fluid w-100 rounded-circle shadow' alt="" /> */}
          {userInfo && userInfo.image ? ( // Check if the user's image is available
                            <img
                            className=''
                              src={userInfo.image} // Display the user's image
                              alt="User Avatar"
                              style={{ width: '95px', height: '95px', borderRadius: '50%' }}
                            />
                          ) : (
                    <Avatar
                      size={95} 
                      className='mx-auto'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      icon={<UserOutlined />} // Fallback icon when the user is not logged in
                      alt="Default Avatar"
                    />
                          )}
        </div>
        <div className="col-12 pt-2 p text-light">
          <p>Admin</p></div>
        <div className="col pt-1 h5 text-light">
          <h6>{userInfo.fullName}</h6></div>
      </div>
    </div>
  )
}
