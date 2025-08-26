import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useCart();

  const { user, logout } = useContext(AuthContext);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
<span>Cart ({cartItems.length})</span>

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">ShopItUp</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
          {['/', '/products', '/categories', '/about', '/contact'].map((path, idx) => {
            const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <li key={idx} className="nav-item">
                <Link className="nav-link" to={path}>{label}</Link>
              </li>
            );
          })}
        </ul>

          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item"><span className="nav-link">Welcome!</span></li>
                <li className="nav-item"><Link className="nav-link" to="/account">Account</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/signin">Sign In</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
              </>
            )}
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && <span className="cart-badge badge rounded-pill bg-danger">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;