import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../config/firebase'; // adjust path if needed

export default function ShowFaqs() {
  const [activeCategory, setActiveCategory] = useState('General');
  const [faqData, setFaqData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchFaqs = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'Faqs'));
      const data = { General: [], Delivery: [], Payment: [] };

      querySnapshot.forEach(doc => {
        const faq = doc.data();
        if (data[faq.type]) {
          data[faq.type].push({ question: faq.question, answer: faq.answer });
        }
      });

      setFaqData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="container py-5 show-faqs">
      <h1 className="text-center  mb-4" style={{ fontFamily: 'fantasy' }}>Find Your Answers</h1>

      {loading ? (
        <div className="text-center">
          <div className="spinner spinner-grow"></div>
        </div>
      ) : (
        <>
          <div className="faq-tabs mb-4 d-flex justify-content-center flex-wrap gap-2">
            {Object.keys(faqData).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn ${activeCategory === cat ? 'btn-danger' : 'btn-outline-danger'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="accordion" id="faqAccordion">
            {faqData[activeCategory]?.map((item, index) => (
              <div className="accordion-item mb-3 shadow-sm" key={index}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`collapse${index}`}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-muted">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
