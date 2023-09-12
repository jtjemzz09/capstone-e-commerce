import {  Routes, Route, } from 'react-router-dom';
import Home from "./component/Home"
import Login from "./component/Login"
import NavBar from "./component/NavBar"
import Profile from "./component/Profile"
import Products from "./component/Products"
import Cart from "./component/Cart"
import Register from "./component/Register"
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleProduct from './component/SingleProduct';


function App() {


  return (
    <>
      <div>
        <NavBar/>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="products" element={ <Products />} />
        <Route path="/Profile" element={ <Profile />} />
        <Route path="/Login" element={  <Login />} />
        <Route path="/Cart" element={  <Cart />} />
         <Route path="/Register" element={  <Register />} />
         <Route path="/products/:id" element={  <SingleProduct/>} />
        

      </Routes>
      </div>
     
    </>
  )
}

export default App
