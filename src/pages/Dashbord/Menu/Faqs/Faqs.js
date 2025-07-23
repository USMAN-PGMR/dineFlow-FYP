import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { AuthContext } from '../../../../context/AuthContext';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../../../../config/firebase';

const initialState = {
  question: '',
  answer: '',
  type: 'General',
};

export default function Faqs() {
  const { user } = useContext(AuthContext);
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const snapshot = await getDocs(collection(firestore, 'Faqs'));
      const data = snapshot.docs.map(doc => doc.data());
      setFaqs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer || !formData.type) {
      window.toastify('All fields are required', 'error');
      return;
    }
    setIsProcessing(true);
    const id = window.getRandomId();
    const data = {
      ...formData,
      id,
      createdBy: { email: user.email, uid: user.uid },
      dateCreated: serverTimestamp(),
    };
    try {
      await setDoc(doc(firestore, 'Faqs', id), data);
      window.toastify('FAQ added successfully', 'success');
      setFormData(initialState);
      fetchFaqs();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Faqs', id));
      setFaqs(prev => prev.filter(f => f.id !== id));
      window.toastify('FAQ deleted', 'success');
    } catch (error) {
      console.error(error);
      window.toastify('Delete failed', 'error');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateData.question || !updateData.answer || !updateData.type) {
      window.toastify('All fields are required', 'error');
      return;
    }
    setIsProcessing(true);
    try {
      await updateDoc(doc(firestore, 'Faqs', updateData.id), {
        ...updateData,
        dateModified: serverTimestamp(),
        modifiedBy: { email: user.email, uid: user.uid },
      });
      window.toastify('FAQ updated', 'success');
      setUpdateData(null);
      fetchFaqs();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateChange = (e) => {
    setUpdateData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <h5>Faq's</h5>
          <p className="fw-semibold">
            <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
            <Link className="text-decoration-none text-dark">Faq's</Link>
          </p>
        </div>

        <div className="row px-4">
          <div className="col-12 mt-4">
            <div className="card border-0 py-4 px-3">
              <div className="text-end">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  <BsPlusLg /> Add FAQ
                </button>
              </div>
              <hr />

              {isLoading ? (
                <div className="text-center">
                  <div className="spinner spinner-grow"></div>
                </div>
              ) : faqs.length === 0 ? (
                <p className="text-center text-danger fs-4">No FAQs found</p>
              ) : (
                <div className="table-responsive mt-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqs.map(faq => (
                        <tr key={faq.id}>
                          <td>{faq.type}</td>
                          <td>{faq.question}</td>
                          <td>{faq.answer}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning m-1"
                              data-bs-toggle="modal"
                              data-bs-target="#updateModal"
                              onClick={() => setUpdateData(faq)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger m-1"
                              onClick={() => handleDelete(faq.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Add Modal */}
              <div className="modal fade" id="addModal" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add FAQ</h5>
                      <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          className="form-control my-2"
                          name="question"
                          placeholder="Question"
                          value={formData.question}
                          onChange={handleChange}
                        />
                        <textarea
                          className="form-control my-2"
                          name="answer"
                          placeholder="Answer"
                          value={formData.answer}
                          onChange={handleChange}
                        ></textarea>
                        <select
                          className="form-control my-2"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                        >
                          <option value="General">General</option>
                          <option value="Payment">Payment</option>
                          <option value="Delivery">Delivery</option>
                        </select>
                        <button className="btn btn-primary w-100" disabled={isProcessing}>
                          {isProcessing ? 'Processing...' : 'Add FAQ'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Update Modal */}
              <div className="modal fade" id="updateModal" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Update FAQ</h5>
                      <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleUpdate}>
                        <input
                          type="text"
                          className="form-control my-2"
                          name="question"
                          placeholder="Question"
                          value={updateData?.question || ''}
                          onChange={handleUpdateChange}
                        />
                        <textarea
                          className="form-control my-2"
                          name="answer"
                          placeholder="Answer"
                          value={updateData?.answer || ''}
                          onChange={handleUpdateChange}
                        ></textarea>
                        <select
                          className="form-control my-2"
                          name="type"
                          value={updateData?.type || 'General'}
                          onChange={handleUpdateChange}
                        >
                          <option value="General">General</option>
                          <option value="Payment">Payment</option>
                          <option value="Delivery">Delivery</option>
                        </select>
                        <button className="btn btn-success w-100" disabled={isProcessing}>
                          {isProcessing ? 'Saving...' : 'Save Changes'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
