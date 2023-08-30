import { useState, useEffect } from "react";
import { getAllProducts, getAllCategories, fetchSingleProduct } from "../API/index"; // Import your API functions
import "bootstrap/dist/css/bootstrap.min.css";
import SingleProduct from "./SingleProduct";

function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("price");
    const [searchTerm, setSearchTerm] = useState("");
     const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductPosition, setSelectedProductPosition] = useState({ top: 0, left: 0 });

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

                const sortedProducts = fetchedProducts.sort((a, b) => {
                    if (sortBy === "price") {
                        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
                    } else if (sortBy === "priceDesc") {
                        return sortOrder === "asc" ? b.price - a.price : a.price - b.price;
                    } else if (sortBy === "topRated") {
                        if (b.rating && a.rating) {
                            return b.rating.rate - a.rating.rate;
                        }
                        return 0;
                    }
                });

                setProducts(sortedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts(); // Call the fetchProducts function inside the useEffect
    }, [selectedCategory, sortOrder, sortBy]);

 // Function to handle click on product title
    const handleProductClick = async (productId, event) => {
        try {
            const singleProduct = await fetchSingleProduct(productId);
            setSelectedProduct(singleProduct);
            setSelectedProductPosition({
                top: event.clientY,
                left: event.clientX
            });
        } catch (error) {
            console.error("Error fetching single product:", error);
        }
    };

    function postMatches(product, text) {
        const fieldsToCheck = ['title', 'description', 'price',];
        return fieldsToCheck.some(field =>
            typeof product[field] === 'string' && product[field].toLowerCase().includes(text.toLowerCase())
        );
    }

    const filteredProducts = searchTerm ? products.filter(product => postMatches(product, searchTerm)) : products;

    return (
        <div >
              {/* Category selection */}
            <div>
                <button onClick={() => setSelectedCategory(null)}>All</button>
                <button onClick={() => setSelectedCategory("electronics")}>Electronics</button>
                <button onClick={() => setSelectedCategory("jewelery")}>Jewelry</button>
                <button onClick={() => setSelectedCategory("men's clothing")}>Men's Clothing</button>
                <button onClick={() => setSelectedCategory("women's clothing")}>Women's Clothing</button>
            </div>
            <div >
          
            <div>
                {/* Sort dropdown menu */}
                <label htmlFor="sortBy">Sort by:</label>
                <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="price">Price Low to High</option>
                    <option value="priceDesc">Price High to Low</option>
                    <option value="topRated">Top Rated</option>
                </select>
            </div>
                {/* Search bar */}
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control"
                            />

<div className="col-md-4">
                    {/* Use the SingleProduct component to display selected product */}
                     <SingleProduct productId={selectedProduct?.id} position={selectedProductPosition} />
                </div>
             {/* Product list */}
            <div className="row">
                
                 {filteredProducts.map(product => (
                    
                    <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <img src={product.image} alt={product.title} className="card-img-top mx-auto" />
                            <div className="card-body text-center">
                                <h5 className="card-title"  onClick={(event) => handleProductClick(product.id, event)}>{product.title}</h5>
                                <p className="card-text">${product.price}</p>
                                <div className="rating">
                                    {product.rating && (
                                        <>
                                            <p>Rating: {product.rating.rate}</p>
                                            <p>({product.rating.count} reviews)</p>
                                        </>
                                    )}
                                </div>
                                <button className="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
        </div>
    );
}

export default Shop;




