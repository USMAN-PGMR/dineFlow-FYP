import React from 'react'
import profileImg from '../../../assets/team4.jpg'

export default function Profile() {
  return (
    <div className="container  text-center py-3">
      <div className="row">
        <div className="col-12 text-center px-5 ">
          <img src={profileImg} className='img-fluid w-100 rounded-circle shadow' alt="" />
        </div>
        <div className="col-12 pt-2 p text-light">
          <p>Admin</p></div>
        <div className="col pt-1 h5 text-light">
          <h6>Muhammad Usman Ali</h6></div>
      </div>
    </div>
  )
}
