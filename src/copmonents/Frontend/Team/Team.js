import React, { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../../config/firebase'; // update path if needed

export default function Team() {
  const [showModal, setShowModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  // team paragraph 
  const [TeamSection, setTeamSection] = useState([]);
  const activeTeamMembers = teamMembers.filter(member => member.status === 'active');


  // Firebase se team members fetch karna
  const fetchTeamMembers = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, 'Team'));
      const data = snapshot.docs.map(doc => doc.data());
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);
// team section description
useEffect(() => {
        const fetchTeamSection = async () => {
            try {
                const TeamSection = await getDoc(doc(firestore, 'About', 'TeamSection'));
                if (TeamSection.exists()) {
                    const data = TeamSection.data();
                    //   setAboutHeading(data.heading || '');
                    setTeamSection(data.paragraphs || []);
                }
            } catch (err) {
                console.error('Failed to load team description data:', err);
            }
        };

        fetchTeamSection();
    }, []);
  return (
    <div className="container pt-5">
      <div className="row py-5">
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
          <h5 className='text-danger py-2' style={{ fontFamily: 'fantasy' }}>Our Backbone</h5>
          <h1 className='py-2' style={{ fontFamily: 'fantasy' }}>Meet The Team</h1>
          {TeamSection.map((para, index) => (
                                <p key={index} className='text-secondary'  style={{ fontSize: '18px' }}>
                                    {para}
                                </p>
                            ))}
         
          <div className="row pb-5">
            <button
              className="zoom-button w-auto px-3 px-lg-4 ms-2 py-3 bg-danger fw-semibold mt-3"
              style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}
              onClick={() => setShowModal(true)}
            >
              VIEW ALL
            </button>
          </div>
        </div>

        {/* --- Firebase team members shown here (outside modal) --- */}
        <div className="col-12 col-lg-6">
          <div className="row">
            {activeTeamMembers.slice(0, 4).map((member, index) => (
              <div className="col-12 col-md-6 mt-4" key={index}>
                <div className="card bg-light border-0 text-center">
                  <img className='w-100 rounded-top' src={member.image} alt={member.fullName} />
                  <h5 className='pt-4' style={{ fontFamily: 'fantasy' }}>{member.fullName}</h5>
                  <p className='text-secondary pb-2 fw-semibold'>{member.profession}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Modal starts --- */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(3px)',
          }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Our Full Team</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {activeTeamMembers.map((member, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                      <div className="card h-100 shadow-sm border-0">
                        <img
                          src={member.image}
                          alt={member.fullName}
                          className="card-img-top"
                          style={{ height: '220px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                          <h5 className="card-title text-danger">{member.fullName}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">{member.profession}</h6>
                          <p className="card-text">{member.about}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
