import { Link } from 'react-router-dom';
import about from "../img/about.png";

function About() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6">
          <h1 className="text-primary fw-bold mb-4">About Us</h1>
          <p className="lead mb-4">
            Welcome to BUTIK, where fashion, technology, and elegance seamlessly blend together. We take pride in curating an exquisite collection of clothing, accessories, cutting-edge gadgets, and exquisite jewelry, all handpicked for those who appreciate the beauty of style and innovation. Our journey began with a simple vision – to offer a shopping experience that caters to the diverse tastes and desires of our customers. With a keen eye for trends and an unwavering commitment to quality, we bring you the latest in fashion, technology, and adornments from around the world.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
        <div className="col-lg-6">
          <img
            src={about}
            alt="About Us"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default About;