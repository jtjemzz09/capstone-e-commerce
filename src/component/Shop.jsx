import  { useState, useEffect } from "react";
import { getAllProducts } from "../API/index";

function Shop() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getAllProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Shop</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                       <div className="rating">
                            <p>Rating: {product.rating.rate}</p>
                            <p>({product.rating.count} reviews)</p>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;
