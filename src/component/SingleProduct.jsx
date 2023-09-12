
import { useState, useEffect } from "react";
import { fetchSingleProduct, addToCart } from "../API/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";



function SingleProduct({ productId, }) {
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

// Function to handle adding a product to the cart
    const handleAddToCart = async (productId) => {
      try {
        
        const cartData = await addToCart({
          userId: 1, 
          date: "2020-02-03",
          products: [{ productId, quantity: 1 }],
        });
        console.log("Item added to cart:", cartData);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    };


    return (
       
            <div className="product-container">
                <div className=" col-md-4">
                    <img src={product.image} alt={product.title}
                    height="400" width="400" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50"> {product.category}</h4>
                    <h1 className ="dislplay-5"> {product.title} </h1>
                    <p className="lead">{product.description}</p>
                    <p className="lead fw-bolder">${product.price}</p>
                    <div className="lead fw-bolder">
                        {product.rating && (
                            <div className="lead" >
                                <p className="lead fw-bolder">Rating: {product.rating.rate}
                                <FontAwesomeIcon icon={faStar} style={{ color: "#161717" }} />
                                </p>
                                <p>({product.rating.count} reviews)</p>
                                <button className="btn btn-outline-dark px-4 py-2"onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                                <Link to="/cart" className="btn btn-dark ms-2 px-3"> Go to Cart</Link>
                            </div>
                        )}
                    </div>
                   
                </div>
                 
            </div>
        
    );
}
export default SingleProduct;

