import contact from "../img/contact.png";

function Contact() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6">
          <h1 className="mb-4">Have Some Questions?</h1>
          <hr />
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Carl Dave"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
        <div className="col-lg-6">
          <img
            src={contact}
            alt="Contact Us"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;