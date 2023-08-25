import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser, faHouse, faRightToBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
    return (
        <div className="nav-container">
           <img src={logo} alt=" Logo" className="nav-logo" />
           
           <nav className="nav">
            <Link to="/" className="nav-link">
                <FontAwesomeIcon icon={faHouse} style={{color: "#519fb3",}} />
            </Link>
          <Link to ="Profile" className="nav-link">
              <FontAwesomeIcon icon={faUser} style={{color: "#519fb3",}} />
          </Link>
          <Link to ="Login " className="nav-link">
           <FontAwesomeIcon icon={faRightToBracket} style={{color: "#519fb3",}} />
          </Link>
          <Link to ="Cart " className="nav-link">
           <FontAwesomeIcon icon={faCartShopping} style={{color: "519fb3",}} />
          </Link>

            </nav>
        </div>
    );
}

export default NavBar;