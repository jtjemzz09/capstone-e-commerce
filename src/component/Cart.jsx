import { useEffect, useState } from 'react';
import { fetchSingleProduct } from '../API';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartData, setCartData] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [itemsRemoved, setItemsRemoved] = useState(0);
  const [quantityInput, setQuantityInput] = useState({}); 
  const isLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        // Check if the user is logged in
        if (isLoggedIn) {
          const storedCartData = JSON.parse(localStorage.getItem('cart'));

          if (storedCartData && storedCartData.products) {
            setCartData(storedCartData);

            // Initialize quantityInput based on cart data
            const initialQuantityInput = {};
            storedCartData.products.forEach((product) => {
              initialQuantityInput[product.productId] = product.quantity;
            });
            setQuantityInput(initialQuantityInput);

            const productIds = storedCartData.products.map((product) => product.productId);
            const productsData = await Promise.all(productIds.map((productId) => fetchSingleProduct(productId)));
            setCartProducts(productsData);
          }
        }
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart();
  }, [isLoggedIn, itemsRemoved]);

  useEffect(() => {
    if (!cartData || !cartData.products || !cartProducts.length) {
      setSubtotal(0); // Set subtotal to 0 if cartData or cartProducts are not available
      return;
    }

    const total = cartProducts.reduce((acc, product) => {
     const cartItem = cartData.products.find((item) => item.productId === String(product.id));
      const subtotalForProduct = cartItem ? product.price * cartItem.quantity : 0;
      return acc + subtotalForProduct;
    }, 0);
     // Set the calculated total as the subtotal
    setSubtotal(total.toFixed(2));
  }, [cartData, cartProducts, itemsRemoved]);

const removeItem = (productId) => {
  console.log('Removing item with productId:', productId);

  // Check if the product to be removed exists in the cart
  const isProductInCart = cartData.products.some((item) => item.productId === String(productId));

  if (isProductInCart) {
    // Filter out the product to be removed
    const updatedProducts = cartData.products.filter((item) => item.productId !== String(productId));

    // Create an updated cart data object
    const updatedCartData = {
      ...cartData,
      products: updatedProducts,
    };

    // Update the cart data in local storage
    localStorage.setItem('cart', JSON.stringify(updatedCartData));

    // Update the state to reflect the change
    setCartData(updatedCartData);

    // Update the itemsRemoved state to trigger a re-render
    setItemsRemoved(itemsRemoved + 1);
  } else {
    console.log('Product not found in cart.');
  }
};

  const handleQuantityChange = (productId, newQuantity) => {
  // Convert productId to string
  productId = String(productId);

  // Update the local state (quantityInput)
  const updatedQuantityInput = { ...quantityInput };
  updatedQuantityInput[productId] = newQuantity;
  setQuantityInput(updatedQuantityInput);

  // Update the cart data in local storage
  const updatedCartData = { ...cartData };
  const updatedProducts = updatedCartData.products.map((item) => {
    if (item.productId === productId) {
      item.quantity = newQuantity;
    }
    return item;
  });

  updatedCartData.products = updatedProducts;

  // Update the cart data in local storage
  localStorage.setItem('cart', JSON.stringify(updatedCartData));

  // Trigger a recalculation of the subtotal
  recalculateSubtotal(updatedCartData.products);
};

// Function to recalculate the subtotal
const recalculateSubtotal = (updatedProducts) => {
  const total = cartProducts.reduce((acc, product) => {
    const cartItem = updatedProducts.find((item) => item.productId === String(product.id));
    const subtotalForProduct = cartItem ? product.price * cartItem.quantity : 0;
    return acc + subtotalForProduct;
  }, 0);

  setSubtotal(total.toFixed(2));
};

  return (
    <div className="container my-5">
      <h1>Your Cart</h1>
      {isLoggedIn && cartData && cartData.products.length > 0 && cartProducts.length > 0 ? (
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
                    <p className="card-text">
                      Quantity: {quantityInput[product.id] || 0}
                    </p>
                    <button className="btn btn-danger" onClick={() => removeItem(product.id)}>
                      Remove
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantityInput[product.id] || 0}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
           <div className="row">
        <div className="col-md-6 offset-md-6">
          <div className="text-end">
            <p>Subtotal: ${subtotal}</p>
            <Link to="/CheckOut" className="btn btn-primary">
              Checkout
            </Link>
          </div>
        </div>
      </div>
        </div>
        
      ) : (
        <p>Your cart is empty.</p>
      )}
      
    </div>
  );
}

export default Cart;




