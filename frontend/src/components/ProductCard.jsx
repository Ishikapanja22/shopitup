import React from 'react';

const ProductCard = ({ product }) => (
  <div className="card product-card">
    <div className="product-image">
      <i className="fas fa-box-open"></i>
    </div>
    <div className="card-body">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">${product.price.toFixed(2)}</p>
      <button className="btn btn-maroon w-100">Add to Cart</button>
    </div>
  </div>
);

export default ProductCard;
