import React from 'react';
import analytics1 from '../../../../assets/analytics1.jpg';
import analytics2 from '../../../../assets/analytics2.jpg';
import analytics3 from '../../../../assets/analytics3.jpg';
export default function Home() {
  return (
    <>
    <div className="container   py-4 ">
      <div className="row  ">
        <div className="col-12 pt-2">
          <h5>WellCome To Dashboard!</h5>
        </div>
      </div>
      <div className="row py-2">
        <div className="col-12 col-lg-6 text-center">
            <img className=' ' src={analytics1} alt="" />
        </div>
        <div className="col-12 col-lg-6 text-center  mt-3 mt-lg-0">
            <img className='  ' src={analytics3} alt="" />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-5 text-center">
          <img className='mx-auto text-center ' src={analytics2} alt="" />
        </div>
      </div>
    </div>
    </>
  )
}
