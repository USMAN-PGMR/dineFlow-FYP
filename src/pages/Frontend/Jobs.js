import React from 'react'
import { Link } from 'react-router-dom'
import AboutHeader from '../../copmonents/Frontend/AboutHeader/AboutHeader'
import ShowJobs from '../../copmonents/Frontend/ShowJobs'
import Footer from '../../copmonents/Frontend/Footer/Footer'

export default function Jobs() {
  return (
    <>
    {/* hero + header */}
     <div className="jobsHero text-white">
        
            
            <AboutHeader/>
            <div className="container pt-5 mt-5">
              <div className="row pt-5 pb-3 ">
                <div className="col mt-lg-5 pt-lg-5">
                  <h1 style={{fontFamily:'fantasy'}}>All Jobs</h1>
                  <h6 className='py-2 '><Link  to='/' style={{color:'white',outline:'none',textDecoration:'none'}} >Home</Link> / JObs</h6>
                </div>
              </div>
            </div>
            </div>

            {/* show jobs  */}
            <ShowJobs/>

            {/* footer */}
            <Footer/>
    </>
  )
}
