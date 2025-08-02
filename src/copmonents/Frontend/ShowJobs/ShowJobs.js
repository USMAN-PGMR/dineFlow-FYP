import React, { useState, useEffect } from 'react';
import { firestore, storage } from '../../../config/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ShowJobs() {
  const [jobData, setJobData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    resumeFile: null,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "jobs"));
        const jobsData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((job) => job.status === "Active");
        setJobData(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: '',
      resumeFile: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )) {
      setFormData({ ...formData, resumeFile: file });
    } else {
      alert("Only PDF or Word documents are allowed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resumeFile) {
      alert("Please upload a valid resume file.");
      return;
    }

    setIsSubmitting(true);

    try {
      const resumeRef = ref(storage, `resumes/${Date.now()}_${formData.resumeFile.name}`);
      await uploadBytes(resumeRef, formData.resumeFile);
      const downloadURL = await getDownloadURL(resumeRef);

      const applicantData = {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        resumeURL: downloadURL,
        appliedAt: new Date(),
      };

      await addDoc(collection(firestore, "applicants"), applicantData);
      alert("Application submitted successfully!");
      closeModal();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="container py-5 show-jobs-page">
      <div className="text-center mb-5">
        <h1 className="" style={{ fontFamily: 'fantasy' }}>Explore Careers</h1>
        <p className="">Be a part of our fast-growing restaurant team</p>
      </div>

      <div className="row g-4">
        {isLoading ? (
          <div className="w-100 d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : jobData.length === 0 ? (
          <p className="text-center">No active jobs available at the moment.</p>
        ) : (
          jobData.map((job) => (
            <div className="col-md-6 col-lg-4" key={job.id}>
              <div className="card job-card h-100 shadow">
                <img
                  src={job.imageURL}
                  alt={job.title}
                  className="card-img-top job-img"
                />
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
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Apply for {selectedJob?.title}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Upload Resume</label>
                      <input type="file" onChange={handleFileChange} className="form-control" accept=".pdf,.doc,.docx" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="3" placeholder="Tell us about yourself..." />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-danger w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
