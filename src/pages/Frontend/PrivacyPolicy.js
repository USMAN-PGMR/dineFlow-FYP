import React from 'react';
import Header from '../../copmonents/Frontend/Header/Header';
import Footer from '../../copmonents/Frontend/Footer/Footer';

export default function PrivacyPolicy() {
  return (
    <>
    {/* header */}
      <Header />
      {/* hero section */}
      <section className="privacy-hero d-flex align-items-center text-white">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">Privacy Policy</h1>
          <p className="lead mt-2">Your trust is our priority</p>
        </div>
      </section>
{/* main */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="policy-box p-4 mb-4 shadow-sm">
              <h4>1. What We Collect</h4>
              <p>We collect your name, email, and order details when you interact with our services.</p>
            </div>

            <div className="policy-box p-4 mb-4 shadow-sm">
              <h4>2. Why We Collect It</h4>
              <p>We use this information to process orders, send updates, and enhance your experience.</p>
            </div>

            <div className="policy-box p-4 mb-4 shadow-sm">
              <h4>3. Security</h4>
              <p>Your data is encrypted and stored securely. We never sell or misuse your data.</p>
            </div>

            <div className="policy-box p-4 mb-4 shadow-sm">
              <h4>4. Cookies</h4>
              <p>We use cookies for personalization. You can disable them in your browser settings.</p>
            </div>

            <div className="policy-box p-4 mb-4 shadow-sm">
              <h4>5. Contact Us</h4>
              <p>If you have questions about your data, contact us at <strong>support@dineflow.com</strong>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer/>
    </>
  );
}
