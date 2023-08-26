import { useState } from 'react';
import { registerUser } from '../API/index'; // Import the registerUser function from your API module

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registrationData = {
      email,
      username,
      password,
      name: {
        firstname: firstName,
        lastname: lastName,
      },
      address: {
        city,
        street,
        number: parseInt(number),
        zipcode,
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
      },
      phone,
    };

    try {
      const result = await registerUser(registrationData);
      console.log('Registration successful:', result);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      {registrationSuccess ? (
        <p>Registration successful! Please log in.</p>
      ) : (
        <form onSubmit={handleSubmit}>
           <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />

        <label>Street:</label>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />

        <label>Number:</label>
        <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />

        <label>Zipcode:</label>
        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />

        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
