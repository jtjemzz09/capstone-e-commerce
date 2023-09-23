import { useState } from 'react';
import { registerUser } from '../API/index';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    // State variables to store form input values
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phone, setPhone] = useState("");
    // State variable to track registration success
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    // Use the navigate function to programmatically redirect
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

    // Prepare registration data from form input values
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
                number: parseInt(number), // Parse number as integer
                zipcode,
                geolocation: {
                    lat: "-37.3159",
                    long: "81.1496",
                },
            },
            phone,
        };

        try {
            // Call the registerUser function from your API to register the user
            const result = await registerUser(registrationData);
            console.log("Registration successful:", result);
            // Set the registration success state to true
            setRegistrationSuccess(true);
            // Use the navigate function to redirect to the login page
            navigate("/Login");
        } catch (error) {
            console.error("Registration error:", error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Register</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {registrationSuccess ? (
                        <div className="alert alert-success">Registration successful! Please log in.</div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">
                                    City:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="street" className="form-label">
                                    Street:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="street"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="number" className="form-label">
                                    Number:
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="zipcode" className="form-label">
                                    Zipcode:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zipcode"
                                    value={zipcode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">
                                    Phone:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;





