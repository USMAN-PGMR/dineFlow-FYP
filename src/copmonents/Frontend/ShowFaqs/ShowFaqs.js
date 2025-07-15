import React, { useState } from 'react';

const faqData = {
  General: [
    {
      question: 'What are your opening hours?',
      answer: 'We are open daily from 11 AM to 11 PM, including weekends.',
    },
    {
      question: 'Do you offer takeaway and dine-in options?',
      answer: 'Yes, both takeaway and dine-in services are available.',
    },
  ],
  Delivery: [
    {
      question: 'What areas do you deliver to?',
      answer: 'We deliver within a 10km radius of all our branches.',
    },
    {
      question: 'Is there a minimum order for delivery?',
      answer: 'Yes, the minimum order for delivery is Rs 500.',
    },
  ],
  Payment: [
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept cash, cards, and online transfers.',
    },
    {
      question: 'Can I pay online for my delivery?',
      answer: 'Yes, online payment is available during checkout.',
    },
  ],
};

export default function ShowFaqs() {
  const [activeCategory, setActiveCategory] = useState('General');

  return (
    <div className="container py-5 show-faqs">
      <h1 className="text-center  mb-4" style={{ fontFamily: 'fantasy' }}>Find Your Answers</h1>

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
        {faqData[activeCategory].map((item, index) => (
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
    </div>
  );
}
