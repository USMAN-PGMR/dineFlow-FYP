import React from 'react'
import team1 from '../../../assets/team1.jpg';
import team2 from '../../../assets/team2.jpg'
import team3 from '../../../assets/team3.jpg'
import team4 from '../../../assets/team4.jpg'

const teamMembers=[
    {
        img: team1,
        name: 'Miranda Blue',
        role:'Executive Chef'
    },
    {
        img: team2,
        name: 'Jonathan Flock',
        role:'Assistant Chef'
    },
    {
        img: team3,
        name: 'Mich Jean',
        role:'Assistant Chef'
    },
    {
        img: team4,
        name: 'Andrew Lumber',
        role:'Assistant Chef'
    },
]
export default function Team() {
  return (
    <div className="container pt-5">
        <div className="row py-5">
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
            <h5 className='text-danger py-2' style={{ fontFamily: 'fantasy' }}>Our Backbone</h5>
                    <h1 className='py-2' style={{ fontFamily: 'fantasy' }}>Meet The Team</h1>
                    <p className='text-secondary' style={{ fontSize: '18px' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <p className='text-secondary' style={{ fontSize: '18px' }}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    
                    <div className="row pb-5 ">
                        <button className="zoom-button w-auto px-3 px-lg-4 ms-2  py-3 bg-danger fw-semibold mt-3" style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}>
                            VIEW ALL
                        </button>
                    </div>
            </div>
            <div className="col-12 col-lg-6">
               <div className="container">
                <div className="row">
                {teamMembers.map((member, index) => (

                    <div className="col-12 col-md-6 mt-4">
                        <div className="card bg-light border-0  text-center  ">
                            {/* <div className="row"> */}
                                <img className='w-100 rounded-top ' src={member.img} alt="" />
                                <h5 className='pt-4' style={{fontFamily:'fantasy'}}>{member.name}</h5>
                                <p className='text-secondary pb-2 fw-semibold'>{member.role}</p>
                            {/* </div> */}
                        </div>
                    </div>
                ))}
                   
                </div>
               </div>
            </div>
        </div>
    </div>
  )
}
