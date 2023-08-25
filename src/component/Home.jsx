import homepage from "../img/homepage.png";
import { Link } from "react-router-dom";

function Home() {
const backgroundImage = `url(${homepage})`;

 const homeStyle = {
    backgroundImage: backgroundImage,
    backgroundSize: "100% auto",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center bottom", 
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
    
};



    return (
        <div style={homeStyle}>
            <Link to ="/Shop" className="shop-button"> VISIT OUR SHOP</Link>
        </div>
    );
}

export default Home;