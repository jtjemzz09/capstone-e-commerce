import {loginUser,
  getUserCart,
  getUserInfo, } from "../API";
import React, { useEffect, useState } from 'react';

function Cart() {
 const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to authenticate the user 
  async function authenticateUser() {
    try {
      // Simulate user login and get the token from local storage
      const token = localStorage.getItem('token');

      if (token) {
        // If a token exists, the user is considered authenticated
        setIsAuthenticated(true);
        return true;
      } else {
        // Authentication failed
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  useEffect(() => {
    async function fetchData() {
      // Authenticate the user
      const isAuthenticated = await authenticateUser();

      if (isAuthenticated) {
        // Get the user's info
        const userId = 1; 
        const userData = await getUserInfo(userId);

        if (userData) {
          setUserData(userData);

          // Get the user's cart data
          const cartData = await getUserCart(userId);
          console.log('cart cart', cartData)
          setCartData(cartData);
        }
      }
    }

    fetchData();
  }, []);


  function renderUserCart() {
    return (
      <div>
        <h2>Welcome, {userData.name.firstname} {userData.name.lastname}!</h2>
        <h3>Your Cart:</h3>
        <ul>
          {cartData[0].products.map((item) => (
            <li key={item.id}>{item.productId}</li>
          ))}
        </ul>
      </div>
    );
  }

  // If the user is not authenticated, you can add your logic to redirect them to the login page.
  if (!isAuthenticated) {
    // Redirect logic or display a message to log in
    return <div>Please log in to view your cart.</div>;
  }

  return (
    <div>
      {userData && cartData.length > 0 ? renderUserCart() : <div>Loading...</div>}
    </div>
  );
}

export default Cart;