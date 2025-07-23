import React, { useEffect, useState } from 'react';
import signature from '../../../assets/signature.png';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../config/firebase'; // Make sure the path is correct

export default function ServingPizza() {
  const [aboutHeading, setAboutHeading] = useState('');
  const [aboutParagraphs, setAboutParagraphs] = useState([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutDoc = await getDoc(doc(firestore, 'About', 'AboutSection'));
        if (aboutDoc.exists()) {
          const data = aboutDoc.data();
          setAboutHeading(data.heading || '');
          setAboutParagraphs(data.paragraphs || []);
        }
      } catch (err) {
        console.error('Failed to load About data:', err);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <div className="container">
      <div className="row mt-5 py-5">
        <div className="col-12 col-lg-6 px-lg-4 ">
          <div className="card aboutBack h-100 border-0">
            {/* You can add image or background here if needed */}
          </div>
        </div>

        <div className="col-12 col-lg-6 py-5 px-4">
          <h5 className='text-danger py-2' style={{ fontFamily: 'fantasy' }}>Sir Slice's Heritage</h5>

          {/* 🔥 Dynamic About Heading */}
          <h1 className='py-2' style={{ fontFamily: 'fantasy' }}>{aboutHeading}</h1>

          {/* 🔥 Dynamic About Paragraphs */}
          {aboutParagraphs.map((para, index) => (
            <p key={index} className='text-secondary' style={{ fontSize: '18px' }}>
              {para}
            </p>
          ))}

          <div className="row py-2">
            <img className='w-auto img-fluid' src={signature} alt="signature" />
          </div>

          <div className="row pb-5 ">
            <Link
              to='/allProducts'
              className="zoom-button nav-link w-auto px-3 px-lg-4 ms-2  py-3 bg-danger fw-semibold mt-3"
              style={{ boxShadow: "0 0 25px rgb(255, 168, 168)" }}
            >
              CHECK OUR MENU
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
