import { useState } from 'react';
import { loginUser,  } from '../API/index';
import Register from './Register';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSuccess = (token,) => {
    localStorage.setItem('token', token);
     sessionStorage.setItem('username', username);
     

     
  
    setIsLoggedIn(true);
    navigate('/');
    window.location.reload();
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting login form');
    const loginData = {
        username,
        password,
    };

    try {
        const result = await loginUser(loginData);
        console.log('Received token:', result.token);
        handleLoginSuccess(result.token);
        window.alert("Login successful!");
    } catch (err) {
        setError("Invalid credentials. Please try again.");
    }
};


  

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true); 
    
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <div className="login-container">
      <h2>{isLoggedIn ? 'Logged In' : 'Login'}</h2>
      <p> Get access to your orders</p>

      {isLoggedIn ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
          
          
        </div>
      ) : (
        <div>
          {registrationSuccess ? (
            <div>
              <p>Registration successful! Please log in.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label htmlFor="login-username">Username:</label>
                <input
                  type="text"
                  id="login-username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="login-password">Password:</label>
                <input
                  type="password"
                  id="login-password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button type="submit" className="login-button">Login</button>
              <p> By continuing, you agree to butik's Terms of Use and Privacy Policy</p>
            </form>
          )}
          {!isLoggedIn && !registrationSuccess && (
            <p className="register-link">New to Butik? Create an account <Link to="/register">Register</Link></p>
          )}
        </div>
      )}
      {showRegistrationForm && (
        <Register onSuccess={handleRegistrationSuccess} />
      )}

     
    </div>
  );
}

export default Login;
