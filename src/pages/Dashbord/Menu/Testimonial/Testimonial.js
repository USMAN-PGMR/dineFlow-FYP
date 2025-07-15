// Testimonial.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { AuthContext } from '../../../../context/AuthContext';
import { deleteDoc, doc, orderBy, serverTimestamp, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { firestore, storage } from '../../../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const initialState = {
  name: '',
  title: '',
  message: '',
  image: null,
};

export default function Testimonial() {
  const [state, setState] = useState(initialState);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [updateId, setUpdateId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Testimonials'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setTestimonials(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateChange = (e) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.title || !state.message || !image) {
      window.toastify('All fields and image are required', 'error');
      return;
    }
    setIsProcessing(true);
    const imageRef = ref(storage, `testimonial_images/${image.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on('state_changed', null, console.error, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      const testimonialData = {
        ...state,
        image: downloadURL,
        dateCreated: serverTimestamp(),
        id: window.getRandomId(),
        createdBy: { email: user.email, uid: user.uid },
      };
      await setDoc(doc(firestore, 'Testimonials', testimonialData.id), testimonialData);
      window.toastify('Testimonial added successfully', 'success');
      setState(initialState);
      setImage(null);
      setIsProcessing(false);
      fetchTestimonials();
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Testimonials', id));
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      window.toastify('Deleted successfully', 'success');
    } catch (err) {
      console.error(err);
      window.toastify('Delete failed', 'error');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const updateRef = doc(firestore, 'Testimonials', updateData.id);

    if (image) {
      const imageRef = ref(storage, `testimonial_images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on('state_changed', null, console.error, async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(updateRef, {
          ...updateData,
          image: downloadURL,
          dateModified: serverTimestamp(),
          emailModified: { email: user.email, uid: user.uid },
        });
        window.toastify('Updated successfully', 'success');
        fetchTestimonials();
        setIsProcessing(false);
      });
    } else {
      await updateDoc(updateRef, {
        ...updateData,
        dateModified: serverTimestamp(),
        emailModified: { email: user.email, uid: user.uid },
      });
      window.toastify('Updated successfully', 'success');
      fetchTestimonials();
      setIsProcessing(false);
    }
  };

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <h5>Testimonial</h5>
          <p className="fw-semibold">
            <Link className="text-decoration-none text-secondary">Dashboard</Link> /{' '}
            <Link className="text-decoration-none text-dark">Testimonial</Link>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 ">
          <div className="card border-0 py-4 px-3">
            <div className="row">
              <div className="col-12 text-end">

                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                  <BsPlusLg /> Add
                </button>
                <hr />
              </div>
             


              {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border"></div>
                </div>
              ) : testimonials.length === 0 ? (
                <p className="text-center text-danger fs-4">No testimonials found</p>
              ) : (
                <div className="col px-x">

                <Table className="table ">
                  <Thead>
                    <Tr>
                      <Th>Image</Th>
                      <Th>Name</Th>
                      <Th>Title</Th>
                      <Th>Message</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {testimonials.map((item) => (
                      <Tr key={item.id}>
                        <Td><img src={item.image} style={{ width: 50, height: 50 }} alt="img" /></Td>
                        <Td>{item.name}</Td>
                        <Td>{item.title}</Td>
                        <Td>{item.message}</Td>
                        <Td>
                          <button className="btn btn-sm btn-warning m-1" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => { setUpdateData(item); setUpdateId(item.id); }}>Edit</button>
                          <button className="btn btn-sm btn-danger m-1" onClick={() => handleDelete(item.id)}>Delete</button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                    </div>
              )}

              {/* Add Modal */}
              <div className="modal fade" id="addModal" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Testimonial</h5>
                      <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <input type="text" className="form-control my-2" name="name" placeholder="Name" value={state.name} onChange={handleChange} />
                        <input type="text" className="form-control my-2" name="title" placeholder="Title" value={state.title} onChange={handleChange} />
                        <textarea className="form-control my-2" name="message" placeholder="Message" value={state.message} onChange={handleChange}></textarea>
                        <input type="file" className="form-control my-2" onChange={handleImageChange} />
                        <button className="btn btn-primary w-100" disabled={isProcessing}>{isProcessing ? 'Processing...' : 'Add Testimonial'}</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Update Modal */}
      <div className="modal fade" id="updateModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Testimonial</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <input type="text" className="form-control my-2" name="name" placeholder="Name" value={updateData.name || ''} onChange={handleUpdateChange} />
                <input type="text" className="form-control my-2" name="title" placeholder="Title" value={updateData.title || ''} onChange={handleUpdateChange} />
                <textarea className="form-control my-2" name="message" placeholder="Message" value={updateData.message || ''} onChange={handleUpdateChange}></textarea>
                <input type="file" className="form-control my-2" onChange={handleImageChange} />
                <button className="btn btn-success w-100" disabled={isProcessing}>{isProcessing ? 'Saving...' : 'Save Changes'}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
