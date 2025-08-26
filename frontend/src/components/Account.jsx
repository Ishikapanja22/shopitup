import React, { useState, useEffect } from "react";
import axios from "axios";

const Account = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You are not logged in.");
      return;
    }

    fetchProfile();
    fetchOrders();
  }, []);

 const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    setError("You are not logged in.");
    return;
  }

  try {
    const { data } = await axios.get("/api/users/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,},
    });

    const nameParts = data.name?.split(" ") || [];
    setUser({
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      email: data.email || "",
      phone: data.phone || "",
    });
    setError("");
  } catch (err) {
    console.error("Profile fetch error:", err);
    setError("Authentication failed. Please log in again.");
  }
};


  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/myorders", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,}
      });
      setOrders(data);
    } catch (err) {
      console.error("Order fetch error:", err);
      setOrders([]);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      const payload = {
        name: fullName,
        email: user.email,
        phone: user.phone,
      };

      await axios.put("/api/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Profile updated successfully.");
      setError("");
      fetchProfile();
    } catch (err) {
      console.error("Profile update error:", err);
      setMessage("");
      setError("Update failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <div className="container" style={{ marginTop: "76px", padding: "50px 0" }}>
      <div className="row">
        <div className="col-md-3">
          <div className="card p-3">
            <h5 style={{ color: "var(--maroon)" }}>My Account</h5>
            <ul className="list-unstyled">
              <li>
                <button className="btn btn-link text-decoration-none p-0" onClick={() => setActiveSection("profile")}>
                  Profile
                </button>
              </li>
              <li>
                <button className="btn btn-link text-decoration-none p-0" onClick={() => setActiveSection("orders")}>
                  Order History
                </button>
              </li>
              <li>
                <button className="btn btn-link text-decoration-none p-0" onClick={() => setActiveSection("addresses")}>
                  Addresses
                </button>
              </li>
              <li>
                <button className="btn btn-link text-decoration-none p-0" onClick={() => setActiveSection("wishlist")}>
                  Wishlist
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-9">
          {activeSection === "profile" && (
            <div className="card p-4">
              <h4 style={{ color: "var(--maroon)" }}>Profile Information</h4>
              <form onSubmit={updateProfile}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-maroon">Update Profile</button>
              </form>
              {message && <p className="mt-3 text-success">{message}</p>}
              {error && <p className="mt-3 text-danger">{error}</p>}
            </div>
          )}

          {activeSection === "orders" && (
            <div className="card p-4">
              <h4 style={{ color: "var(--maroon)" }}>Order History</h4>
              {orders.length > 0 ? (
                <ul className="list-group">
                  {orders.map((order) => (
                    <li key={order._id} className="list-group-item">
                      <strong>Order #{order._id}</strong><br />
                      Date: {new Date(order.createdAt).toLocaleDateString()}<br />
                      Total: ${order.totalPrice.toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found or failed to fetch orders.</p>
              )}
            </div>
          )}

          {activeSection === "addresses" && (
            <div className="card p-4">
              <h4 style={{ color: "var(--maroon)" }}>Saved Addresses</h4>
              <p>Saved addresses will be loaded here.</p>
            </div>
          )}

          {activeSection === "wishlist" && (
            <div className="card p-4">
              <h4 style={{ color: "var(--maroon)" }}>My Wishlist</h4>
              <p>Wishlist items will be loaded here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
