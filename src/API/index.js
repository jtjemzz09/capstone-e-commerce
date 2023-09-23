// The base URL for making API requests to the Fake Store API
const BASE_URL ='https://fakestoreapi.com'

//header

export const makeHeaders = (includeToken = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeToken) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};


//function for getting all the products
export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        
        
        return data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


//function to fetch single product
export const fetchSingleProduct = async (productId) => {
   try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log("get single product data:", data);
    return data;
} catch (error) {
    console.error("Error fetching single product:", error);
    throw error;
}
};



//function for login

export const loginUser = async (loginData) => {
    console.log('loginUser function called');
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginData.username,
                password: loginData.password
            })
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
        throw err; 
    }
};


//function to register user

export const registerUser = async (registrationData) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//function to get all categories

export const getAllCategories = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};




//Function to add items to the cart 

export const addToCart = async (userId, cartId, date, product) => { 
  try {
    const cartData = JSON.parse(localStorage.getItem("cart")) || { userId: 4, cartId: 6, products: [] };

    const existingProduct = cartData.products.find((cartProduct) => cartProduct.productId === product.productId);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cartData.products.push({ productId: product.productId, quantity: product.quantity });
    }

    // Update the cart data in local storage
    localStorage.setItem("cart", JSON.stringify(cartData));

    return cartData; // Return the updated cart data
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};


