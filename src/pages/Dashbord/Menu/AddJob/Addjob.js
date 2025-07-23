import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function Addjob() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    salary: '',
    shift: '',
    status: 'Active',
    image: null,
    imageURL: '', // ✅ Added
    description: '',
  });
  

  useEffect(() => {
    const unsub = onSnapshot(collection(firestore, 'jobs'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(list);
    });
    return () => unsub();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddOrUpdate = async () => {
    const { title, type, location, salary, shift, description, image } = formData;
  
    if (!title || !type || !location || !salary || !shift || !description) {
      window.toastify("All fields are required", "error");
      return;
    }
  
    if (!editId && !image) {
      window.toastify("Image is required", "error");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const jobData = {
        title,
        type,
        location,
        salary,
        shift,
        status: formData.status,
        description,
        imageURL: formData.imageURL || '', // ✅ Retain existing image if available
      };
      
  
      const uploadAndSave = () => {
        return new Promise((resolve, reject) => {
          if (image) {
            const storageRef = ref(storage, `jobs/${Date.now()}_${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
  
            uploadTask.on(
              'state_changed',
              null,
              (error) => {
                console.error("Upload error:", error);
                window.toastify("Failed to upload image", "error");
                setIsLoading(false);
                reject(error);
              },
              async () => {
                const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
                jobData.imageURL = imageURL;
                await saveJobData(jobData);
                resolve();
              }
            );
          } else {
            saveJobData(jobData).then(resolve).catch(reject);
          }
        });
      };
      console.log("Image to be uploaded:", image);

  
      const saveJobData = async (data) => {
        if (editId) {
          const jobRef = doc(firestore, 'jobs', editId);
          await updateDoc(jobRef, data);
          window.toastify('Job updated successfully', 'success');
        } else {
          await addDoc(collection(firestore, 'jobs'), data);
          window.toastify('Job added successfully', 'success');
        }
  
        resetForm();
        setShowModal(false);
      };
  
      await uploadAndSave();
    } catch (error) {
      console.error('Error:', error);
      window.toastify('Something went wrong', 'error');
    } finally {
      setIsLoading(false); // ✅ Always run this at the end
    }
  };
  
  
  

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    setIsLoading(true);
    try {
      await deleteDoc(doc(firestore, 'jobs', id));
      window.toastify('Job deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting job:', error);
      window.toastify('Failed to delete job', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      title: job.title,
      type: job.type,
      location: job.location,
      salary: job.salary,
      shift: job.shift,
      status: job.status,
      image: null,               // file input will be empty
      imageURL: job.imageURL,   
      description: job.description,
    });
    setEditId(job.id);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: '',
      location: '',
      salary: '',
      shift: '',
      status: 'Active',
      image: null,
      description: '',
    });
    setEditId(null);
  };

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <h5>Jobs</h5>
          <p className="fw-semibold">
            <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
            <Link className="text-decoration-none text-dark">Jobs</Link>
          </p>
        </div>

        <div className="row px-4">
          <div className="col-12 mt-4">
            <div className="card border-0 py-4 px-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="fw-bold">Jobs</h4>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                  <BsPlusLg /> Add Job
                </button>
              </div>
              <hr />

              <div className="row">
                {jobs.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <h5 className="text-muted">Jobs are not available</h5>
                  </div>
                ) : (
                  jobs.map((job) => (
                    <div className="col-md-4 mb-4" key={job.id}>
                      <div className="card shadow border-0 h-100">
                        {job.imageURL && (
                          <img
                            src={job.imageURL}
                            className="card-img-top"
                            alt={job.title}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        )}
                        <div className="card-body">
                          <h5 className="card-title">{job.title}</h5>
                          <p className="card-text mb-1"><strong>Type:</strong> {job.type}</p>
                          <p className="card-text mb-1"><strong>Location:</strong> {job.location}</p>
                          <p className="card-text mb-1"><strong>Salary:</strong> {job.salary}</p>
                          <p className="card-text mb-1"><strong>Shift:</strong> {job.shift}</p>
                          <p className="card-text mb-1"><strong>Status:</strong> {job.status}</p>
                          <p className="card-text mt-2">{job.description}</p>
                          <div className="d-flex gap-2 mt-3">
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => handleEdit(job)}
                              disabled={isLoading}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(job.id)}
                              disabled={isLoading}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Modal */}
              {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content p-3">
                      <div className="modal-header">
                        <h5 className="modal-title">{editId ? 'Edit Job' : 'Add New Job'}</h5>
                        <button type="button" className="btn-close" onClick={() => { setShowModal(false); resetForm(); }}></button>
                      </div>
                      <div className="modal-body row g-3">
                        {[
                          { label: 'Job Title', name: 'title' },
                          { label: 'Job Type', name: 'type' },
                          { label: 'Location', name: 'location' },
                          { label: 'Salary', name: 'salary' },
                          { label: 'Shift', name: 'shift' },
                        ].map(({ label, name }) => (
                          <div className="col-md-6" key={name}>
                            <label className="form-label">{label}</label>
                            <input
                              type="text"
                              className="form-control"
                              name={name}
                              value={formData[name]}
                              onChange={handleInputChange}
                            />
                          </div>
                        ))}
                        <div className="col-md-6">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="col-md-12">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <div className="col-md-12">
                          <label className="form-label">Image Upload</label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            name="image"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary"
                          onClick={() => { setShowModal(false); resetForm(); }}
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={handleAddOrUpdate}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Processing...' : editId ? 'Update Job' : 'Add Job'}
                        </button>
                      </div>
                    </div>
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
