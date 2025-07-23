import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

export default function TopBar() {
    const [phone, setPhone] = useState('');
      useEffect(() => {
          const fetchPhone = async () => {
              try {
                  const phone = await getDoc(doc(firestore, 'Contact', 'FindUs'));
                  if (phone.exists()) {
                      const data = phone.data();
                      //   setAboutHeading(data.heading || '');
                      setPhone(data.phone || '' );
                  }
              } catch (err) {
                  console.error('Failed to load phone data:', err);
              }
          };
  
          fetchPhone();
      }, []);
  return (
    <nav class="navbar bg-dark py-0">
  <div class="container py-0 my-0">
    <span class=" text-white outline-none" >
      {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"> */}
      <i class="fa-solid fa-phone"></i>
      <span> {phone}</span>
    </span>
    <div className="d-flex">
    <div className="btn btn-danger rounded-0 py-2 px-2 fw-semibold   " style={{fontSize:'15px'}}> <span className='mt-1 d-inline-block'>Order Now</span> </div>

    </div>
  </div>
</nav>
  )
}
