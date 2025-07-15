import React from 'react'
import SecondHeader from '../../copmonents/Frontend/SecondHeader/SecondHeader'
import ShowFaqs from '../../copmonents/Frontend/ShowFaqs'
import HeroFaqs from '../../copmonents/Frontend/HeroFaqs'
import DarkFooter from '../../copmonents/Frontend/DarkFooter'

export default function Faqs() {
  return (
    <>
    {/* header */}
    <div className="shadow">

    <SecondHeader/>
    </div>

    {/* hero section */}
    <HeroFaqs/>
    {/* show faqs */}
    <ShowFaqs/>
    {/* footer */}
    <DarkFooter/>
    </>
  )
}
