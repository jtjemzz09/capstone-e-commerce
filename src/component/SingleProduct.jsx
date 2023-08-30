import { useState, useEffect } from "react";
import { fetchSingleProduct } from "../API/index";


function SingleProduct({ productId }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    console.log("Fetching product with productId:", productId);
                    const singleProduct = await fetchSingleProduct(productId);
                    setProduct(singleProduct);
                } catch (error) {
                    console.error("Error fetching single product:", error);
                }
            };
    
            fetchProduct();
        }
    }, [productId]);

    if (!product) {
        return null;
    }

    return (
        <div className="card">
            <div className="product-container">
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                    <div className="product-title">{product.title}</div>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price}</p>
                    <div className="product-rating">
                        {product.rating && (
                            <div>
                                <p>Rating: {product.rating.rate}</p>
                                <p>({product.rating.count} reviews)</p>
                            </div>
                        )}
                    </div>
                    {/* Add more details as needed */}
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;

