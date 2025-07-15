import React from 'react';
import Header from '../../copmonents/Frontend/Header/Header';
import Footer from '../../copmonents/Frontend/Footer/Footer';
// import './TermsConditions.scss';

export default function TermsConditions() {
  return (
    <>
    {/* Header */}
      <Header />
      {/* hero section */}
      <section className="terms-hero d-flex align-items-center text-white">
        <div className="container text-center">
          <h1 className="display-5 fw-bold">Terms & Conditions</h1>
          <p className="lead mt-2">Please read our terms carefully before using our services</p>
        </div>
      </section>
      {/* main */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">

            <div className="terms-box p-4 mb-4 shadow-sm">
              <h4>1. Acceptance of Terms</h4>
              <p>By accessing or using our website, you agree to be bound by these terms and conditions.</p>
            </div>

            <div className="terms-box p-4 mb-4 shadow-sm">
              <h4>2. Orders & Payments</h4>
              <p>All orders must be paid in full at checkout. We reserve the right to cancel orders due to unavailability or system errors.</p>
            </div>

            <div className="terms-box p-4 mb-4 shadow-sm">
              <h4>3. Cancellations</h4>
              <p>Orders cannot be cancelled once processed. For issues, contact support immediately.</p>
            </div>

            <div className="terms-box p-4 mb-4 shadow-sm">
              <h4>4. User Conduct</h4>
              <p>You agree not to misuse our services or submit any harmful, fraudulent, or inappropriate content.</p>
            </div>

            <div className="terms-box p-4 mb-4 shadow-sm">
              <h4>5. Changes to Terms</h4>
              <p>We may update these terms at any time. Continued use of the site means you accept the changes.</p>
            </div>

            <div className="terms-box p-4 mb-4 shadow-sm">
              <h4>6. Contact Us</h4>
              <p>For any questions, email us at <strong>support@dineflow.com</strong>.</p>
            </div>

          </div>
        </div>
      </section>
      {/* footer */}
      <Footer/>
    </>
  );
}
