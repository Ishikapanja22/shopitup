import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with real API call
    const fetchOrders = async () => {
      try {
        // Simulate fetch
        const response = await fetch("/api/orders"); // example endpoint
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading order history...</div>;

  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border rounded-xl p-4 shadow-sm">
            <div><strong>Order ID:</strong> {order.id}</div>
            <div><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</div>
            <div><strong>Total:</strong> ₹{order.total}</div>
            <ul className="mt-2">
              {order.items.map((item, index) => (
                <li key={index} className="text-sm">
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
