const BASE_URL ='https://fakestoreapi.com'

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        console.log("get products data:", data);
        
        return data; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};