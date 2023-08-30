const BASE_URL ='https://fakestoreapi.com'

export const makeHeaders = (includeToken = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (includeToken) {
    const token = sessionStorage.getItem('token');
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