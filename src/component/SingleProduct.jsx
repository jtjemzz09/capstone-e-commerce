import { useState, useEffect } from "react";
import { fetchSingleProduct, addToCart } from "../API/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1); // Initialize quantity state with 1

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
  const handleAddToCart = async () => {
  try {
    const hardcodedCartId = 6;
    const userId = 4;
    const date = '2020-02-03';
    const productToAdd = { productId: productId, quantity: quantity }; // Pass product as an object
    const cartData = await addToCart(userId, hardcodedCartId, date, productToAdd);
    console.log("Item added to cart:", cartData);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  return (
    <div className="product-container">
      <div className="col-md-5">
        <img src={product.image} alt={product.title} height="400" width="400" className="product-image" />
      </div>
      <div className="col-md-6">
        <h4 className="text-uppercase text-black-50"> {product.category}</h4>
        <h1 className="display-5"> {product.title} </h1>
         <div className="overflow-auto" style={{ maxHeight: '200px' }}> 
      <p className="lead">{product.description}</p>
      </div>
        <p className="lead fw-bolder">${product.price}</p>
        <div className="lead fw-bolder">
          {product.rating && (
            <div className="lead" >
              <p className="lead fw-bolder">Rating: {product.rating.rate}
                <FontAwesomeIcon icon={faStar} style={{ color: "#161717" }} />
              </p>
              <p>({product.rating.count} reviews)</p>
              <div className="d-flex align-items-center">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="me-2 form-control"
                />
                <button className="btn btn-outline-dark px-4 py-2" onClick={handleAddToCart}>Add to Cart</button>
                <Link to="/cart" className="btn btn-dark ms-2 px-3"> Go to Cart</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;


