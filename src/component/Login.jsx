import { useState } from 'react';
import { loginUser,  } from '../API/index';
import Register from './Register';
import {  useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('donero');
  const [password, setPassword] = useState('ewedon');
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

  const handleLoginSuccess = (token,userId) => {
    console.log("userId" ,userId)
    localStorage.setItem('token', token);
     localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);
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
         const userId= 4
        console.log('Received token:', result.token);
        
        handleLoginSuccess(result.token, userId);
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">
                {isLoggedIn ? 'Logged In' : 'Login'}
              </h2>
              <p className="card-text text-center">Get access to your orders</p>

              {isLoggedIn ? (
                <div>
                  <p>You are logged in!</p>
                  <button
                    className="btn btn-primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  {registrationSuccess ? (
                    <div>
                      <p>Registration successful! Please log in.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="login-username" className="form-label">
                          Username:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="login-username"
                          value={username}
                          onChange={handleUsernameChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="login-password" className="form-label">
                          Password:
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="login-password"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                      <p className="mt-3">
                        By continuing, you agree to Butik's Terms of Use Privacy Policy
                      </p>
                    </form>
                  )}
                  {!isLoggedIn && !registrationSuccess && (
                    <p className="mt-3">
                      New to Butik? Create an account{' '}
                      <button
                        className="btn btn-link p-0"
                        onClick={() => setShowRegistrationForm(true)}
                      >
                        Register
                      </button>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {showRegistrationForm && (
            <Register onSuccess={handleRegistrationSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;