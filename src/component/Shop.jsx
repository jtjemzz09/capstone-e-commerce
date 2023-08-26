import { useState, useEffect } from "react";
import { getAllProducts, getAllCategories } from "../API/index"; // Import your API functions

function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const[sortOrder, setSortOrder]= useState("asc");
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let fetchedProducts;

                if (selectedCategory) {
                     console.log(`Fetching products for category: ${selectedCategory}`);
                    fetchedProducts = await getAllCategories(selectedCategory);
                     console.log("Fetched products:", fetchedProducts);
                } else {

                    fetchedProducts = await getAllProducts();
                }

                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts(); // Call the fetchProducts function inside the useEffect

    }, [selectedCategory]);

    
    return (
        <div>
           
            {/* Category selection */}
            <div>
                <button onClick={() => setSelectedCategory(null)}>All Categories</button>
                <button onClick={() => setSelectedCategory("electronics")}>Electronics</button>
                <button onClick={() => setSelectedCategory("jewelery")}>Jewelry</button>
                <button onClick={() => setSelectedCategory("men's clothing")}>Men's Clothing</button>
                <button onClick={() => setSelectedCategory("women's clothing")}>Women's Clothing</button>
            </div>
            {/* Product list */}
            <ul className="product-list">
                
                {products.map(product => (
                    <li key={product.id} className="product">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                        <div className="rating">
                            {product.rating && (
                                <>
                                    <p>Rating: {product.rating.rate}</p>
                                    <p>({product.rating.count} reviews)</p>
                                </>
                            )}
                        </div>
                        <button>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Shop;




// import  { useState, useEffect } from "react";
// import { getAllProducts } from "../API/index";

// function Shop() {
//     const [products, setProducts] = useState([]);

//     const fetchProducts = async () => {
//         try {
//             const fetchedProducts = await getAllProducts();
//             setProducts(fetchedProducts);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     return (
//         <div>
//             <h2>Shop</h2>
//             <div className="product-list">
//                 {products.map(product => (
//                     <div key={product.id} className="product">
//                         <img src={product.image} alt={product.title} />
//                         <h3>{product.title}</h3>
//                         <p>${product.price}</p>
//                        <div className="rating">
//                             <p>Rating: {product.rating.rate}</p>
//                             <p>({product.rating.count} reviews)</p>
//                         </div>
//                         <button>Add to Cart</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Shop;
