import React, { useEffect, useState } from 'react'
import { BsPerson } from 'react-icons/bs'
import { CiPizza } from 'react-icons/ci'
import { LiaCheeseSolid } from 'react-icons/lia'
import { BiSolidDrink } from 'react-icons/bi'
import CountUp from 'react-countup';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase'; // Make sure the path is correct



export default function OurStory() {
    const [successStory, setSuccessStory] = useState([]);
    useEffect(() => {
        const fetchStoryData = async () => {
            try {
                const storyDoc = await getDoc(doc(firestore, 'About', 'SuccessStory'));
                if (storyDoc.exists()) {
                    const data = storyDoc.data();
                    //   setAboutHeading(data.heading || '');
                    setSuccessStory(data.paragraphs || []);
                }
            } catch (err) {
                console.error('Failed to load SuccessStory data:', err);
            }
        };

        fetchStoryData();
    }, []);
    return (
        <div className="container-fluid py-5 text-center ourStory text-white">
            <div className="row">
                <div className="col py-5">
                    <h1 style={{ fontFamily: 'fantasy' }}>Our success Story</h1>
                    <div className="row">
                        <div className="col-12 col-md-6 offset-md-3 px-md-4">
                            {/* success story */}
                            {successStory.map((para, index) => (
                                <p key={index}  style={{ fontSize: '18px' }}>
                                    {para}
                                </p>
                            ))}
                            {/* <p style={{ fontSize: '18px ' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p> */}
                        </div>

                    </div>
                    <div className="container">

                        <div className="row pt-5 ">
                            <div className="col-12 col-md-6 col-lg-3">
                                <span style={{ fontSize: '70px' }}><BsPerson /></span>
                                <h4 className='pt-2 ' style={{ fontFamily: 'fantasy' }}><CountUp start={0} end={24924} /></h4>
                                <h6 style={{ fontSize: '18px' }}>Happy Customers</h6>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 mt-2 mt-md-0">
                                <span style={{ fontSize: '70px' }}><CiPizza /></span>
                                <h4 className='pt-2' style={{ fontFamily: 'fantasy' }}><CountUp start={0} end={65317} /></h4>
                                <h6 style={{ fontSize: '18px' }}>Pizzas Made</h6>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 mt-md-0">
                                <span style={{ fontSize: '70px' }}><LiaCheeseSolid /></span>
                                <h4 className='pt-2' style={{ fontFamily: 'fantasy' }}><CountUp start={0} end={4658} /></h4>
                                <h6 style={{ fontSize: '18px' }}>Cheese Rolls</h6>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 mt-md-0">
                                <span style={{ fontSize: '70px' }}><BiSolidDrink /></span>
                                <h4 className='pt-2' style={{ fontFamily: 'fantasy' }}><CountUp start={0} end={67335} /></h4>
                                <h6 style={{ fontSize: '18px' }}>Drinks Served</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
