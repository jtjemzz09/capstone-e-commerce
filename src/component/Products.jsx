import {useState, useEffect} from "react";
import {getAllProducts, getAllCategories, fetchSingleProduct} from "../API/index"; // Import your API functions
import "bootstrap/dist/css/bootstrap.min.css";
import SingleProduct from "./SingleProduct";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function Products() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("price");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch products based on category, sort order, and search term
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
                // Sort products based on sorting options
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
    const handleProductClick = async (productId) => {
        try {
            const singleProduct = await fetchSingleProduct(productId);
            setSelectedProduct(singleProduct);
            // Use the navigate function to redirect to the SingleProduct component
            navigate(`/products/${productId}`);
        } catch (error) {
            console.error("Error fetching single product:", error);
        }
    };

    // Reset selected product and its position when changing categories
    useEffect(() => {
        setSelectedProduct(null);
    }, [selectedCategory]);

    // Function to check if the search term matches any product field
    function postMatches(product, text) {
        const fieldsToCheck = ["title", "description", "price"];
        return fieldsToCheck.some(
            (field) => typeof product[field] === "string" && product[field].toLowerCase().includes(text.toLowerCase())
        );
    }

    // Filter products based on the search term
    const filteredProducts = searchTerm ? products.filter((product) => postMatches(product, searchTerm)) : products;

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center"> Latest products </h1>
                        <hr />
                    </div>
                    {/* Category selection */}
                    <div className="buttons d-flex justify-content-center mb-5 pb-5">
                        <button className=" btn btn-outline-dark me-2" onClick={() => setSelectedCategory(null)}>
                            All
                        </button>
                        <button
                            className=" btn btn-outline-dark me-2"
                            onClick={() => setSelectedCategory("electronics")}
                        >
                            Electronics
                        </button>
                        <button className=" btn btn-outline-dark me-2" onClick={() => setSelectedCategory("jewelery")}>
                            Jewelry
                        </button>
                        <button
                            className=" btn btn-outline-dark me-2"
                            onClick={() => setSelectedCategory("men's clothing")}
                        >
                            Men's Clothing
                        </button>
                        <button
                            className=" btn btn-outline-dark me-2"
                            onClick={() => setSelectedCategory("women's clothing")}
                        >
                            Women's Clothing
                        </button>
                    </div>
                    <div>
                        {/* Search bar */}
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Sort dropdown menu */}
                        <div className="form-group mb-0">
                            <label htmlFor="sortBy" className="form-label">
                                Sort by:
                            </label>
                            <select
                                id="sortBy"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="form-select"
                            >
                                <option value="price">Price Low to High</option>
                                <option value="priceDesc">Price High to Low</option>
                                <option value="topRated">Top Rated</option>
                            </select>
                        </div>

                        <div className="col-md-4">
                            {/* Use the SingleProduct component to display selected product */}
                            {selectedProduct && <SingleProduct productId={selectedProduct?.id} />}
                        </div>
                        {/* Product list */}
                        <div className="row">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <div className="card h-100 text-center p-4 " key={product.id}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="card-img-top mx-auto product-image"
                                        />
                                        <div className="card-body text-center">
                                          

                                            <h5 className="card-title link-style">
                                                <Link
                                                    to={`/products/${product.id}`}
                                                    onClick={(event) => handleProductClick(product.id, event)}
                                                >
                                                    {product.title}
                                                </Link>
                                            </h5>
                                            <p className="card-text lead fw-bold">${product.price}</p>
                                            <div className="rating">
                                                {product.rating && (
                                                    <div className="lead">
                                                        <p className="lead fw-bolder">
                                                            Rating: {product.rating.rate}
                                                            <FontAwesomeIcon icon={faStar} style={{color: "#161717"}} />
                                                        </p>
                                                        <p>({product.rating.count} reviews)</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
