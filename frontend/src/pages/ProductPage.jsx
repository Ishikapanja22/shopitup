import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from '../context/CartContext'; 

const sampleProducts = [
  {
    id: 1,
    name: "Elegant Dress",
    price: 1999,
    rating: 4.5,
    category: "Fashion",
    image: "/images/dress.jpg",
  },
  {
    id: 2,
    name: "Casual T-Shirt",
    price: 799,
    rating: 4.0,
    category: "Fashion",
    image: "/images/shirt.jpg",
  },
  {
    id: 3,
    name: "Gaming Laptop",
    price: 85999,
    rating: 4.8,
    category: "Electronics",
    image: "/images/laptop.jpg",
  },
  {
    id: 4,
    name: "Sofa Set",
    price: 25999,
    rating: 4.3,
    category: "Home",
    image: "/images/sofa.jpg",
  },
  {
    id: 5,
    name: "Gaming Console",
    price: 39999,
    rating: 4.6,
    category: "Electronics",
    image: "/images/game.jpg",
  },
  {
    id: 6,
    name: "Home Gym Kit",
    price: 6999,
    rating: 4.2,
    category: "Home",
    image: "/images/gym.jpg",
  },
];

const ProductsPage = () => {
  const { addToCart } = useCart(); 
  const navigate = useNavigate(); 

  const [price, setPrice] = useState(100000);
  const [selectedCategories, setSelectedCategories] = useState({
    fashion: false,
    electronics: false,
    home: false,
  });

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    setSelectedCategories((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const getFilteredProducts = () => {
    return sampleProducts.filter((p) => {
      const priceMatch = p.price <= price;
      const categoryMatch =
        Object.values(selectedCategories).every((v) => !v) ||
        selectedCategories[p.category.toLowerCase()];
      return priceMatch && categoryMatch;
    });
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div id="products" className="page active" style={{ marginTop: '76px', padding: '50px 0' }}>
      <div className="container">
        <div className="row">
          {/* Filters */}
          <div className="col-md-3">
            <h5 style={{ color: 'var(--maroon)' }}>Filters</h5>

            <div className="card p-3 mb-3">
              <h6>Price Range</h6>
              <input
                type="range"
                className="form-range"
                min="0"
                max="100000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div className="d-flex justify-content-between">
                <small>₹0</small>
                <small>₹{price}</small>
              </div>
            </div>

            <div className="card p-3 mb-3">
              <h6>Category</h6>
              {['fashion', 'electronics', 'home'].map((cat) => (
                <div key={cat} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={cat}
                    checked={selectedCategories[cat]}
                    onChange={handleCategoryChange}
                  />
                  <label className="form-check-label" htmlFor={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 style={{ color: 'var(--maroon)' }}>All Products</h2>
              <select className="form-select w-auto">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className="row" id="allProducts">
              {filteredProducts.map((product) => (
                <div className="col-md-4 mb-4" key={product.id}>
                  <div className="card h-100">
                    <img src={product.image} className="card-img-top" alt={product.name} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-success fw-bold">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-warning">
                        {"★".repeat(Math.floor(product.rating))}
                        {product.rating % 1 >= 0.5 ? "½" : ""}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          addToCart(product);
                          navigate('/cart'); 
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="text-center text-muted">No products found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
