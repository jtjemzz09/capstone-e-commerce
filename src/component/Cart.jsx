import { useEffect, useState } from 'react';
import { getUserCart, fetchSingleProduct } from '../API';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartData, setCartData] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const userId = 4;
  const cartId = 6;

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        console.log('Fetching user cart...');
        const userCart = await getUserCart(userId, cartId);
        console.log('User cart data:', userCart);
        setCartData(userCart);

        const productIds = userCart[0].products.map((product) => product.productId);
        const productsData = await Promise.all(productIds.map((productId) => fetchSingleProduct(productId)));
        console.log('Products data:', productsData);
        setCartProducts(productsData);
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart();
  }, [userId, cartId]);

  if (!cartData) {
    return <div>Loading...</div>;
  }

  const calculateTotal = () => {
    const total = cartProducts.reduce((acc, product) => {
      const cartItem = cartData[0].products.find((item) => item.productId === product.id);
      return acc + product.price * cartItem.quantity;
    }, 0);
    return total.toFixed(2); // Format total with two decimal places
  };

  return (
    <div className="container my-5">
  <h1>Your Cart</h1>
  {cartData && cartData.length > 0 && cartProducts.length > 0 ? (
    <div className="row cart-row">
      {cartProducts.map((product) => (
        <div key={product.id} className="col-md-6 mb-4 cartPic">
          <div className="card h-100 d-flex flex-column">
            <img src={product.image} alt={product.title} className="card-img-top mx-auto" />
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="card-text">Quantity: {cartData[0].products.find((item) => item.productId === product.id).quantity}</p>
                <button className="btn btn-danger" onClick={() => removeItem(product.id)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>Your cart is empty.</p>
  )}
  <div className="row">
    <div className="col-md-6 offset-md-6">
      <div className="text-end">
        <p>Subtotal: ${calculateTotal()}</p>
        <Link to="/CheckOut" className="btn btn-primary">
          Checkout
        </Link>
      </div>
    </div>
  </div>
</div>
  );
}

export default Cart;




// import {loginUser,
//   getUserCart,
//   getUserInfo,
// fetchProductPriceById } from "../API";
// import React, { useEffect, useState } from 'react';

// function Cart() {
//  const [userData, setUserData] = useState(null);
//   const [cartData, setCartData] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Function to authenticate the user 
//   async function authenticateUser() {
//     try {
//       // Simulate user login and get the token from local storage
//       const token = localStorage.getItem('token');

//       if (token) {
//         // If a token exists, the user is considered authenticated
//         setIsAuthenticated(true);
//         return true;
//       } else {
//         // Authentication failed
//         setIsAuthenticated(false);
//         return false;
//       }
//     } catch (error) {
//       console.error('Authentication error:', error);
//       throw error;
//     }
//   }

//   useEffect(() => {
//     async function fetchData() {
//       // Authenticate the user
//       const isAuthenticated = await authenticateUser();

//       if (isAuthenticated) {
//         // Get the user's info
//         const userId = 4; 
//         const userData = await getUserInfo(userId);

//         if (userData) {
//           setUserData(userData);

//           // Get the user's cart data
//           const cartData = await getUserCart(userId);
//           console.log('cart cart', cartData)
//           setCartData(cartData);
//         }
//       }
//     }

//     fetchData();
//   }, []);

  

//   function renderUserCart() {
//     return (
//       <div>
//         <h2>Welcome, {userData.name.firstname} {userData.name.lastname}!</h2>
//         <h3>Your Cart:</h3>
//         <ul>
//           {cartData[0].products.map((item) => (
//             <li key={item.productId}>{item.productId}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   // If the user is not authenticated, you can add your logic to redirect them to the login page.
//   if (!isAuthenticated) {
//     // Redirect logic or display a message to log in
//     return <div>Please log in to view your cart.</div>;
//   }

//   return (
//     <div>
//       {userData && cartData.length > 0 ? renderUserCart() : <div>Loading...</div>}
//     </div>
//   );
// }

// export default Cart;