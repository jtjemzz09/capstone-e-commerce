import bg from "../img/bg.png";
import Products from "./Products";

function Home() {
    return (
        <div className="homepage">
            <div className="card bg-dark text-white border-0">
  <img src={bg} className="card-img" alt="background" height="600px"/>
  <div className="card-img-overlay d-flex flex-column justify-content-center">
    <div className="containerHome">

    </div>
    <h5 className="card-title display-3 fw-bolder mb-0" >NEW SEASON ARRIVALS</h5>
    <p className="card-text lead fs-2">ALL YOU NEED, ALL IN BUTIK:YOUR ULTIMATE SHOPPING DESTINATION</p>
   
  </div>
</div>
<Products/>
        </div>
    );
}

export default Home;


