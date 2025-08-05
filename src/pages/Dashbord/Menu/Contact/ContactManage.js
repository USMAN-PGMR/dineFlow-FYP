import React, { useEffect, useState } from 'react';
import { firestore } from '../../../../config/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function ContactManage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  // payment info -> Bank account
  const [payment, setPayment] = useState({
    accountTitle: '',
    accountNumber: '',
    type: '',
  });



  // Contact -> Find Us
  const [findUs, setFindUs] = useState({
    location1: '',
    location2: '',
    phone: '',
    email: '',
  });

  // Contact -> Hours
  const [hours, setHours] = useState({
    Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
    Friday: '', Saturday: '', Sunday: '',
  });

  // About Section
  const [aboutHeading, setAboutHeading] = useState('');
  const [aboutParagraphs, setAboutParagraphs] = useState(['']);

  // Success Story
  const [successParagraphs, setSuccessParagraphs] = useState(['']);

  // Team Section
  const [teamParagraphs, setTeamParagraphs] = useState(['']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // payment info
        const paymentSnap = await getDoc(doc(collection(firestore, 'PaymentInfo'), 'BankAccount'));
        if (paymentSnap.exists()) setPayment(paymentSnap.data());

        // Contact
        const findUsSnap = await getDoc(doc(collection(firestore, 'Contact'), 'FindUs'));
        const hoursSnap = await getDoc(doc(collection(firestore, 'Contact'), 'Hours'));
        if (findUsSnap.exists()) setFindUs(findUsSnap.data());
        if (hoursSnap.exists()) setHours(hoursSnap.data());

        // About
        const aboutSnap = await getDoc(doc(collection(firestore, 'About'), 'AboutSection'));
        const successSnap = await getDoc(doc(collection(firestore, 'About'), 'SuccessStory'));
        const teamSnap = await getDoc(doc(collection(firestore, 'About'), 'TeamSection'));

        if (aboutSnap.exists()) {
          setAboutHeading(aboutSnap.data().heading || '');
          setAboutParagraphs(aboutSnap.data().paragraphs || ['']);
        }
        if (successSnap.exists()) setSuccessParagraphs(successSnap.data().paragraphs || ['']);
        if (teamSnap.exists()) setTeamParagraphs(teamSnap.data().paragraphs || ['']);
      } catch (err) {
        window.toastify('Failed to fetch data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // payment info
      await setDoc(doc(collection(firestore, 'PaymentInfo'), 'BankAccount'), {
        accountTitle: payment.accountTitle,
        accountNumber: payment.accountNumber,
        type: payment.type,
      });

      // Contact
      await setDoc(doc(collection(firestore, 'Contact'), 'FindUs'), findUs);
      await setDoc(doc(collection(firestore, 'Contact'), 'Hours'), hours);

      // About
      await setDoc(doc(collection(firestore, 'About'), 'AboutSection'), {
        heading: aboutHeading,
        paragraphs: aboutParagraphs,
      });

      await setDoc(doc(collection(firestore, 'About'), 'SuccessStory'), {
        paragraphs: successParagraphs,
      });

      await setDoc(doc(collection(firestore, 'About'), 'TeamSection'), {
        paragraphs: teamParagraphs,
      });

      window.toastify('Changes saved successfully!','success');
    } catch (err) {
      console.error(err);
      window.toastify('Error saving data', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleArrayChange = (setter, index, value) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addParagraph = (setter) => {
    setter((prev) => [...prev, '']);
  };

  const removeEmptyLast = (arr) => arr.filter((text, i, all) => i === all.length - 1 ? text.trim() !== '' : true);

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12 mb-3">
          <h4 className="fw-bold">Contact & About Manager</h4>
          <p className="fw-semibold text-secondary">
            <Link className="text-decoration-none text-secondary">Dashboard</Link> /
            <Link className="text-decoration-none text-dark"> General Settings</Link>
          </p>
        </div>

        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-light">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : (
              <>
                {/* 📌 Contact Settings */}
                <h5 className="text-primary fw-semibold mb-3">📍 Contact Page Settings</h5>
                <hr />

                <h6 className="text-success fw-semibold mt-2">📌 Find Us</h6>
                <div className="row">
                  {[
                    { name: 'location1', label: 'Location 1', placeholder: 'Main branch address' },
                    { name: 'location2', label: 'Location 2 (Optional)', placeholder: 'Secondary address' },
                    { name: 'phone', label: 'Phone', placeholder: 'Contact number' },
                    { name: 'email', label: 'Email', placeholder: 'Contact email', type: 'email' },
                  ].map(({ name, label, placeholder, type = 'text' }, idx) => (
                    <div className="col-md-6 mb-3" key={idx}>
                      <label className="form-label fw-semibold">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={findUs[name]}
                        onChange={(e) => setFindUs((prev) => ({ ...prev, [name]: e.target.value }))}
                        className="form-control shadow-sm"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                </div>

                {/* ⏰ Hours */}
                <h6 className="text-success fw-semibold mt-4">🕒 Opening Hours</h6>
                <div className="row">
                  {Object.keys(hours).map((day, idx) => (
                    <div className="col-md-6 mb-2" key={idx}>
                      <label className="form-label">{day}</label>
                      <input
                        type="text"
                        name={day}
                        value={hours[day]}
                        onChange={(e) => setHours((prev) => ({ ...prev, [day]: e.target.value }))}
                        className="form-control shadow-sm"
                        placeholder="e.g. 10:00 AM - 10:00 PM"
                      />
                    </div>
                  ))}
                </div>

                {/* ℹ️ About Section */}
                <hr className="my-4" />
                <h5 className="text-primary fw-semibold">ℹ️ About Page Settings</h5>

                <div className="mb-3">
                  <label className="form-label text-success fw-bold">About Heading</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Who We Are"
                    value={aboutHeading}
                    onChange={(e) => setAboutHeading(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-success fw-bold">About Paragraphs</label>
                  {aboutParagraphs.map((p, i) => (
                    <textarea
                      key={i}
                      rows="3"
                      className="form-control mb-2"
                      value={p}
                      onChange={(e) => handleArrayChange(setAboutParagraphs, i, e.target.value)}
                      placeholder={`Paragraph ${i + 1}`}
                    />
                  ))}
                  <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => addParagraph(setAboutParagraphs)}>+ Add Paragraph</button>
                </div>

                <div className="mb-4">
                  <label className="form-label text-success fw-bold">🌟 Success Story</label>
                  {successParagraphs.map((p, i) => (
                    <textarea
                      key={i}
                      rows="4"
                      className="form-control mb-2"
                      value={p}
                      onChange={(e) => handleArrayChange(setSuccessParagraphs, i, e.target.value)}
                      placeholder={`Success paragraph ${i + 1}`}
                    />
                  ))}
                  <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => addParagraph(setSuccessParagraphs)}>+ Add Paragraph</button>
                </div>

                <div className="mb-4">
                  <label className="form-label text-success fw-bold">👥 Team Description</label>
                  {teamParagraphs.map((p, i) => (
                    <textarea
                      key={i}
                      rows="4"
                      className="form-control mb-2"
                      value={p}
                      onChange={(e) => handleArrayChange(setTeamParagraphs, i, e.target.value)}
                      placeholder={`Team paragraph ${i + 1}`}
                    />
                  ))}
                  <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => addParagraph(setTeamParagraphs)}>+ Add Paragraph</button>
                </div>
                {/* payment accont details */}
                <h6 className="text-success fw-semibold mt-4">💳 Payment Account Details</h6>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Account Title</label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      placeholder="e.g. Usman Ali"
                      value={payment.accountTitle}
                      onChange={(e) => setPayment((prev) => ({ ...prev, accountTitle: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Account Number</label>
                    <input
                      type="text"
                      className="form-control shadow-sm"
                      placeholder="e.g. 03001234567"
                      value={payment.accountNumber}
                      onChange={(e) => setPayment((prev) => ({ ...prev, accountNumber: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Account Type</label>
                    <select
                      className="form-select shadow-sm"
                      value={payment.type}
                      onChange={(e) => setPayment((prev) => ({ ...prev, type: e.target.value }))}
                    >
                      <option value="">Select Type</option>
                      <option value="Easypaisa">Easypaisa</option>
                      <option value="JazzCash">JazzCash</option>
                      <option value="Bank">Bank</option>
                    </select>
                  </div>
                </div>

                <div className="text-end mt-3">
                  <button
                    className="btn btn-success px-4 shadow-sm rounded-pill"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : '💾 Save Changes'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
