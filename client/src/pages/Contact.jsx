import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContactForm = () => {
  return (
   <section id="main" className='contact-section'>
     <div className="container m-auto d-flex justify-content-center">
      <div className="card shadow p-4" >
        <h2 className="text-center mb-3" >Get in Touch</h2>
        <p className="text-center text-muted mb-4">Nunc erat cursus tellus gravida.</p>

        <form>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="col">
              <label className="form-label">Phone Number</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">What do you have in mind</label>
            <textarea className="form-control" rows="4" />
          </div>

          <div className="d-grid">
            <button type="submit" className="dark-clr">Submit</button>
          </div>
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-dark mx-2"><i className="fab fa-twitter fa-lg"></i></a>
          <a href="#" className="text-dark mx-2"><i className="fab fa-facebook-f fa-lg"></i></a>
          <a href="#" className="text-dark mx-2"><i className="fab fa-google fa-lg"></i></a>
          <a href="#" className="text-dark mx-2"><i className="fab fa-instagram fa-lg"></i></a>
        </div>
      </div>
    </div>
   </section>
  );
};

export default ContactForm;
