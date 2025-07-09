
import { Avatar } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../../../context/AuthContext';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { storage, firestore } from '../../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function UserProfile() {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    //------------------------- Fetch user data when the component mounts
    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    //---------------------- Function to fetch user data
    const fetchUserData = async () => {
        try {
            const docRef = doc(firestore, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProfile(docSnap.data());
            } else {
                // Handle case when user data is not found
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    // -------------------Function to upload image to Firebase Storage
    const uploadImageToStorage = async (file) => {
        console.log('Uploading image:', file);
        try {
            setIsProcessing(true)
            const storageRef = ref(storage, `user_images/${user.uid}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            await uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Handle progress if needed
                },
                (error) => {
                    console.error('Error uploading image:', error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    // Update the profile state with the image URL
                    setProfile((prevProfile) => ({
                        ...prevProfile,
                        image: downloadURL,
                    }));
                }
            );

            setIsProcessing(false)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    
    
    //-------------- Function to handle image upload
    const handleImageUpload = async () => {
        if (image) {
            setIsProcessing(true);
            await uploadImageToStorage(image);
            setIsProcessing(false);
        }
    };


    //----------------- Define handleChange function
    const handleChange = (e) => {
        setProfile((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };


    //------------------- Function to handle form submit for updating user data
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log('Form submit triggered');
        setIsProcessing(true);

        // Upload the image first, if available
        if (image) {
            await handleImageUpload();
        }

        // Now, update the user profile
        try {
            const formData = {
                ...profile,
                dateModified: serverTimestamp(),
                email: user.email,
                emailModified: {
                    email: user.email,
                    uid: user.uid,
                },
            };

            await setDoc(doc(firestore, 'users', user.uid), formData, { merge: true });
            setProfile(formData); // Update the local state with the new data
            window.toastify('Your Profile has been updated successfully', 'success');
        } catch (error) {
            console.error(error);
            window.toastify('Something went wrong! Profile not updated', 'error');
        }
        setIsProcessing(false);
    };

    //------------------- Function to handle image change
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };




    const avatarIcon = profile.image ? (
        <img className="img-fluid w-100" src={profile.image} alt="Selected Avatar" />
    ) : (
        <UserOutlined />
    );

    return (
        <div className="container my-5 bg-light shadow-sm py-5 px-sm-2 mx-lg-none">
            <div className="row">
                <div className="col text-center">
                    <h3>My Profile</h3>
                </div>
            </div>
            <div className="row px-lg-4">
                <div className="col-12 mt-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-5">
                                <div className="card border-0 py-4 px-3 justify-content-center align-items-center">
                                    <Avatar
                                        className="text-center my-3"
                                        size={150}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        icon={avatarIcon}
                                        alt="Default Avatar"
                                    />
                                    <input type="file" className="form-control" onChange={handleImageChange} />
                                    {isProcessing && (
                                        <div className="progress mt-2">
                                            <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                role="progressbar"
                                                aria-valuenow="100"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 col-md-7">
                                <div className="card border-0 py-4 px-3">
                                    <form >

                                        <div className="container ">
                                            <div className="row pt-2   ">
                                                <div className="col-12 col-lg-6">
                                                    <label for="fullName" className='fw-semibold py-2'>Full Name</label>
                                                    <input type="text" name='fullName' className='form-control py-2' placeholder='Full Name' value={profile.fullName} onChange={handleChange} />
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <label for="email" className='fw-semibold py-2'>Email <span className='fw-lighter text-danger' style={{ fontSize: '11px' }}>(email can't be change) </span> </label>
                                                    <input type="email" name='email' className='form-control py-2' placeholder='Email ' value={profile.email} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="row pt-2 ">
                                                <div className="col-12 col-lg-6">
                                                    <label for="number" className='fw-semibold py-2'>Number</label>
                                                    <input type="tel" name='number' className='form-control py-2' placeholder='Number ' value={profile.number} onChange={handleChange} />
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <label for="city" className='fw-semibold py-2'>City</label>
                                                    <input type="text" name='city' className='form-control py-2' placeholder='City ' value={profile.city} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="row pt-2 ">
                                                <div className="col-12 col-lg-6">
                                                    <label for="address" className='fw-semibold py-2'>Address</label>
                                                    <input type="text" name='address' className='form-control py-2' placeholder='Address ' value={profile.address} onChange={handleChange} />
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <label for="profession" className='fw-semibold py-2'>Profession</label>
                                                    <input type="text" name='profession' className='form-control py-2' placeholder='Profession ' value={profile.profession} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="row py-2">
                                                <div className="col-12">
                                                    <label for="bio" className='fw-semibold py-2'>Bio</label>
                                                    <textarea rows='5' type="text" name='bio' className='form-control py-2' placeholder='Short bio....' value={profile.bio} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="row py-2">
                                                <button className='btn btn-primary w-50 mx-auto' disabled={isProcessing} onClick={handleUpdate}>
                                                    {!isProcessing ? 'Save Changes' : <div className="spinner spinner-border spinner-border-sm"></div>}

                                                </button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
