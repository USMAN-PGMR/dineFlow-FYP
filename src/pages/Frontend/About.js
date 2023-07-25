import React from 'react'
// import SecondHeader from '../../copmonents/Frontend/SecondHeader/SecondHeader'
import TopBar from '../../copmonents/Frontend/TopBar/TopBar'
import AboutHeader from '../../copmonents/Frontend/AboutHeader/AboutHeader'
import { Link } from 'react-router-dom'
import ServingPizza from '../../copmonents/Frontend/ServingPizza'
import OurStory from '../../copmonents/Frontend/OurStory'
import Team from '../../copmonents/Frontend/Team'
import NewsLetter from '../../copmonents/Frontend/NewsLetter'
// import Footer from '../../copmonents/Frontend/Footer'
import DarkFooter from '../../copmonents/Frontend/DarkFooter'

export default function About() {
  return (
    <>
    {/* header + heroSection */}
    <div className="aboutHero text-white">

    <TopBar/>
    <AboutHeader/>
    <div className="container pt-5 mt-5">
      <div className="row pt-5 pb-3 ">
        <div className="col mt-lg-5 pt-lg-5">
          <h1 style={{fontFamily:'fantasy'}}>About Us</h1>
          <h6 className='py-2 '><Link  to='/' style={{color:'white',outline:'none',textDecoration:'none'}} >Home</Link> / About</h6>
        </div>
      </div>
    </div>
    </div>
{/* main */}
<ServingPizza/>
<OurStory/>
<Team/>
<NewsLetter/>
<DarkFooter/>
    </>
  )
}
