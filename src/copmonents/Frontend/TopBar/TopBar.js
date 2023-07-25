import React from 'react'

export default function TopBar() {
  return (
    <nav class="navbar bg-dark py-0">
  <div class="container py-0 my-0">
    <span class=" text-white outline-none" >
      {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"> */}
      <i class="fa-solid fa-phone"></i>
      <span>+123 456 789</span>
    </span>
    <div className="d-flex">
    <div className="btn btn-danger rounded-0 py-2 px-2 fw-semibold   " style={{fontSize:'15px'}}> <span className='mt-1 d-inline-block'>Order Now</span> </div>

    </div>
  </div>
</nav>
  )
}
