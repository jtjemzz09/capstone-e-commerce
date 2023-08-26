import {  Routes, Route, } from 'react-router-dom';
import Home from "./component/Home"
import Login from "./component/Login"
import NavBar from "./component/NavBar"
import Profile from "./component/Profile"
import Shop from "./component/Shop"
import Cart from "./component/Cart"
import Register from "./component/Register"


function App() {


  return (
    <>
      <div>
        <NavBar/>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="Shop" element={ <Shop />} />
        <Route path="/Profile" element={ <Profile />} />
        <Route path="/Login" element={  <Login />} />
        <Route path="/Cart" element={  <Cart />} />
         <Route path="/Register" element={  <Register />} />
        

      </Routes>
      </div>
     
    </>
  )
}

export default App
