import {  Routes, Route, } from 'react-router-dom';
import Home from "./component/Home"
import Login from "./component/Login"
import NavBar from "./component/NavBar"
import Products from "./component/Products"
import Cart from "./component/Cart"
import Register from "./component/Register"
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleProduct from './component/SingleProduct';
import Contact from './component/Contact';
import About from './component/About';


function App() {


  return (
    <>
      <div>
        <NavBar/>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="products" element={ <Products />} />
       <Route path="/Login" element={  <Login />} />
        <Route path="/Cart" element={  <Cart />} />
         <Route path="/Register" element={  <Register />} />
         <Route path="/products/:productid" element={  <SingleProduct/>} />
         <Route path="contact" element={<Contact/>}/>
          <Route path="/about" element={  <About />} />
        

      </Routes>
      </div>
     
    </>
  )
}

export default App
