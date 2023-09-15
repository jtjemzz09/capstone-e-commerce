const BASE_URL ='https://fakestoreapi.com'

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

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        // console.log("get products data:", data);
        
        return data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

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
        throw err; // Rethrow the error to handle it in the calling code
    }
};




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
export const addToCart = async (userId, cartId, date, products) => {
  try {
    const response = await fetch(`${BASE_URL}/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        cartId,
        date,
        products,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add items to the cart');
    }

    const cartData = await response.json();
    return cartData;
  } catch (error) {
    console.error('Error adding items to the cart:', error);
    throw error;
  }
};


// export async function fetchProducts() {
//   const response = await fetch(`${BASE_URL}/products`);
//   const data = await response.json();
//   return data;
// }

// export async function addToCart(userId, productId, quantity) {
//   const response = await fetch(`${BASE_URL}/carts`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ userId, productId, quantity }),
//   });
//   const data = await response.json();
//   return data;
// }

export async function getCart(userId) {
  const response = await fetch(`${BASE_URL}/carts/${userId}`);
  const data = await response.json();
  return data;
}

// Function to fetch a user's cart
export const getUserCart = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/carts/user/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user cart. Status: ${response.status}`);
    }
    const cartData = await response.json();
    return cartData;
  } catch (error) {
    console.error('Error fetching user cart:', error);
    throw error; // You can handle the error as needed in your application
  }
};


//Function to update the cart
export const updateCart = async (cartId, userId, date, products) => {
  try {
    const response = await fetch(`${BASE_URL}/${cartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        date,
        products,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update the cart');
    }

    const updatedCartData = await response.json();
    return updatedCartData;
  } catch (error) {
    console.error('Error updating the cart:', error);
    throw error;
  }
};


//Function to delete a cart by cartId
export const deleteCart = async (cartId) => {
  try {
    const response = await fetch(`${BASE_URL}/${cartId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the cart');
    }

    const deletedCartData = await response.json();
    return deletedCartData;
  } catch (error) {
    console.error('Error deleting the cart:', error);
    throw error;
  }
};




//Function to clear a user's cart
export const clearUserCart = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/carts/user/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to clear user cart. Status: ${response.status}`);
    }
    const clearedCartData = await response.json();
    return clearedCartData;
  } catch (error) {
    console.error('Error clearing user cart:', error);
    throw error; // You can handle the error as needed in your application
  }
};


export const fetchProductPriceById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch product price');
    }

    const productData = await response.json();
    return productData.price; // Assuming the API response contains the price
  } catch (error) {
    console.error('Error fetching product price:', error);
    return 0; // Default to 0 if there's an error
  }
};

export const getUserInfo = async () => {
  try {
    const userId= 4;
    console.log('Fetching user info from URL:', `${BASE_URL}/users/${userId}`);
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }

    const userData = await response.json();
    return userData; // Assuming the API response contains user information
  } catch (error) {
    console.error('Error fetching user information:', error);
    return null; // Default to null if there's an error
  }
};



