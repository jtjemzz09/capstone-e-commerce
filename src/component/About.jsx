import { Link } from 'react-router-dom';
import about from "../img/about.png";


function About() {
    return (
        <div>
            <div className="container py-5 my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-primary fw-bold mb-4">About Us</h1>
                        <p className="lead mb-4">
                            Welcome to BUTIK, where fashion, technology, and elegance seamlessly blend together. We take pride in curating an exquisite collection of clothing, accessories, cutting-edge gadgets, and exquisite jewelry, all handpicked for those who appreciate the beauty of style and innovation.
                            Our journey began with a simple vision – to offer a shopping experience that caters to the diverse tastes and desires of our customers. With a keen eye for trends and an unwavering commitment to quality, we bring you the latest in fashion, technology, and adornments from around the world.
                           
                        </p>
                        <Link to="/contact" className="btn btn-outline-primary px-3">Contact Us</Link>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <img src={about} alt="About Us" height="400px" width="400px" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;