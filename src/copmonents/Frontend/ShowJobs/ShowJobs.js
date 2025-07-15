import React, { useState } from 'react';

const jobData = [
  {
    id: 1,
    title: "Waiter / Waitress",
    type: "Full-Time",
    location: "Main Branch",
    salary: "Rs 25,000 – 30,000",
    shift: "10 AM – 6 PM",
    description: "Energetic individual with great customer service skills needed.",
    image: "https://img.freepik.com/free-photo/handsome-waiter-restaurant_144627-12522.jpg",
  },
  {
    id: 2,
    title: "Chef",
    type: "Full-Time",
    location: "DHA Lahore",
    salary: "Rs 35,000 – 45,000",
    shift: "12 PM – 8 PM",
    description: "Professional chef experienced in desi and fast food recipes.",
    image: "https://img.freepik.com/free-photo/chef-kitchen_144627-20247.jpg",
  },
  {
    id: 3,
    title: "Delivery Rider",
    type: "Part-Time",
    location: "Gulberg Branch",
    salary: "Rs 20,000 + Fuel",
    shift: "5 PM – 11 PM",
    description: "Reliable rider with own bike and valid license required.",
    image: "https://img.freepik.com/free-photo/male-delivery-man-yellow-uniform-with-cap-standing-holding-food-bag-with-scooter_141793-119292.jpg",
  },
];

export default function ShowJobs() {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="container py-5 show-jobs-page">
      <div className="text-center mb-5">
        <h1 className="" style={{fontFamily:'fantasy'}}>Explore Careers</h1>
        <p className="">Be a part of our fast-growing restaurant team</p>
      </div>

      <div className="row g-4">
        {jobData.map((job) => (
          <div className="col-md-6 col-lg-4" key={job.id}>
            <div className="card job-card h-100 shadow">
              <img src={job.image} alt={job.title} className="card-img-top job-img" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark">{job.title}</h5>
                <p className="small mb-1"><strong>Type:</strong> {job.type}</p>
                <p className="small mb-1"><strong>Location:</strong> {job.location}</p>
                <p className="small mb-1"><strong>Salary:</strong> {job.salary}</p>
                <p className="small mb-3"><strong>Shift:</strong> {job.shift}</p>
                <p className="text-muted small flex-grow-1">{job.description}</p>
                <button className="btn btn-danger mt-2" onClick={() => openModal(job)}>Apply Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h5 className="modal-title">Apply for {selectedJob?.title}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Upload Resume</label>
                      <input type="file" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea className="form-control" rows="3" placeholder="Tell us about yourself..." />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-danger w-100">Submit Application</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
