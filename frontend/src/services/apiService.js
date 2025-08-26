// src/services/apiService.js

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
};

const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

const createOrder = async (orderData, token) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

const fetchUserOrders = async (token) => {
  const response = await fetch(`${API_URL}/orders/myorders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export { loginUser, registerUser, fetchProducts, createOrder, fetchUserOrders };