import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHouse, faRightToBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
    return (
        <div className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Logo" className="nav-logo" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto align-items-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-icons d-flex">
                    
                    <Link to="/login" className="nav-link">
                        <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#519fb3" }} />
                    </Link>
                    <Link to="/cart" className="nav-link">
                        <FontAwesomeIcon icon={faCartShopping} style={{ color: "#519fb3" }} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;

// import { Link } from "react-router-dom";
// import logo from "../img/logo.jpg";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  faUser, faHouse, faRightToBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons'

// function NavBar() {
//     return (
//         <div className="nav-container">
//            <img src={logo} alt=" Logo" className="nav-logo" />
           
//            <nav className="nav">

//             <Link to="/" className="nav-link">
//                 <FontAwesomeIcon icon={faHouse} style={{color: "#519fb3",}} />
//             </Link>
//           <Link to ="Profile" className="nav-link">
//               <FontAwesomeIcon icon={faUser} style={{color: "#519fb3",}} />
//           </Link>
//           <Link to ="Login " className="nav-link">
//            <FontAwesomeIcon icon={faRightToBracket} style={{color: "#519fb3",}} />
//           </Link>
//           <Link to ="Cart " className="nav-link">
//            <FontAwesomeIcon icon={faCartShopping} style={{color: "519fb3",}} />
//           </Link>

//             </nav>
//         </div>
//     );
// }

// export default NavBar;