import { useState } from 'react';

function Checkout() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    streetAddress: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e, stateSetter) => {
    const { name, value } = e.target;
    stateSetter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    // Simulate an API call to process payment and create an order
    try {
      // Simulate a successful payment
      await simulatePayment();

      // Clear the form
      setPersonalInfo({
        firstName: '',
        lastName: '',
        email: '',
      });
      setShippingAddress({
        streetAddress: '',
        city: '',
        postalCode: '',
        country: '',
      });
      setPaymentInfo({
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        cvv: '',
      });

      // Show a success message
      setSuccessMessage('Payment successful. Your order has been placed!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error during payment:', error);
      setErrorMessage('Payment failed. Please check your information and try again.');
      setSuccessMessage('');
    }
  };

  // Simulate a payment 
  const simulatePayment = async () => {
    // Simulate a delay to mimic payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Simulate a successful payment
    return Promise.resolve();
  };

  return (
    <div className="container my-5">
      <h1>Checkout</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form>
        <h2>Personal Information</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={(e) => handleInputChange(e, setPersonalInfo)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={(e) => handleInputChange(e, setPersonalInfo)}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange(e, setPersonalInfo)}
            required
          />
        </div>

        <h2>Shipping Address</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="streetAddress" className="form-label">
                Street Address
              </label>
              <input
                type="text"
                className="form-control"
                id="streetAddress"
                name="streetAddress"
                value={shippingAddress.streetAddress}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">
                Postal Code
              </label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
                required
              />
            </div>
          </div>
        </div>

        <h2>Payment Information</h2>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            Card Number
          </label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={(e) => handleInputChange(e, setPaymentInfo)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardHolder" className="form-label">
            Card Holder
          </label>
          <input
            type="text"
            className="form-control"
            id="cardHolder"
            name="cardHolder"
            value={paymentInfo.cardHolder}
            onChange={(e) => handleInputChange(e, setPaymentInfo)}
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="expirationDate" className="form-label">
                Expiration Date
              </label>
              <input
                type="text"
                className="form-control"
                id="expirationDate"
                name="expirationDate"
                value={paymentInfo.expirationDate}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}
                required
              />
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleCheckout}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;

               
