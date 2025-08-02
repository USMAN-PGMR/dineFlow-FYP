import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../../config/firebase';
import moment from 'moment'; // install via: npm install moment

export default function ViewApplicant() {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [selectedJob, setSelectedJob] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'applicants'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplicants(data);
        setFilteredApplicants(data);
        const uniqueTitles = ['All', ...new Set(data.map(app => app.jobTitle))];
        setJobTitles(uniqueTitles);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const filterByJobTitle = (title) => {
    setSelectedJob(title);
    if (title === 'All') {
      setFilteredApplicants(applicants);
    } else {
      setFilteredApplicants(applicants.filter(app => app.jobTitle === title));
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this application?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(firestore, 'applicants', id));
      const updatedList = filteredApplicants.filter(app => app.id !== id);
      setApplicants(prev => prev.filter(app => app.id !== id));
      window.toastify('Application deleted successfully ', 'success');
      setFilteredApplicants(updatedList);
    } catch (error) {
      console.error('Error deleting applicant:', error);
      alert('Failed to delete the application.');
    }
  };

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <h5>Jobs</h5>
          <p className="fw-semibold">
            <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
            <Link className="text-decoration-none text-dark">View Applicants</Link>
          </p>
        </div>

        <div className="row px-4">
          <div className="col-12 mt-4">
            <div className="card border-0 py-4 px-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="fw-bold">All Job Applications</h4>
              </div>
              <hr />

              {/* Job Title Filters */}
              <div className="mb-3">
                {jobTitles.map((title, idx) => (
                  <button
                    key={idx}
                    className={`btn btn-sm me-2 mb-2 ${selectedJob === title ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => filterByJobTitle(title)}
                  >
                    {title}
                  </button>
                ))}
              </div>

              {/* Loader */}
              {loading ? (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }}></div>
                </div>
              ) : filteredApplicants.length === 0 ? (
                <h3 className="text-center text-muted py-4">Applicant not available.</h3>
              ) : (
                <div className="row">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="table-dark text-center">
                        <tr>
                          <th>#</th>
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Job Title</th>
                          <th>Message</th>
                          <th>Applied At</th>
                          <th>Resume</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center align-middle">
                        {filteredApplicants.map((applicant, index) => (
                          <tr key={applicant.id}>
                            <td>{index + 1}</td>
                            <td>{applicant.fullName}</td>
                            <td>{applicant.email}</td>
                            <td>{applicant.phone}</td>
                            <td>{applicant.jobTitle}</td>
                            <td>{applicant.message || '—'}</td>
                            <td>{moment(applicant.appliedAt.toDate()).format('MMM D YYYY, h:mm A')}</td>
                            <td>
                              <a
                                href={applicant.resumeURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                Resume
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(applicant.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
