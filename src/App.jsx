import {  Routes, Route, } from 'react-router-dom';
import Home from "./component/Home"
import Login from "./component/Login"
import NavBar from "./component/NavBar"
import Profile from "./component/Profile"
function App() {


  return (
    <>
      <div>
        <NavBar/>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/Profile" element={ <Profile />} />
        <Route path="/Login" element={  <Login />} />

      </Routes>
      </div>
     
    </>
  )
}

export default App
