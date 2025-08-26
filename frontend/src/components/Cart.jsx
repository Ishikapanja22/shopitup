import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={8}>
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <Card className="mb-3" key={index}>
                <Card.Body className="d-flex align-items-center">
                  <Image
                    src={item.image || "https://via.placeholder.com/100"}
                    rounded
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    className="me-3"
                  />
                  <div className="flex-grow-1">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className="text-muted mb-2">
                      {item.category || "General"}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>
                        ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                      </strong>
                    </Card.Text>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span>Qty: {item.quantity || 1}</span>
                    <Button
                      variant="outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <hr />
              <p>Subtotal: ₹{calculateSubtotal().toFixed(2)}</p>
              <p>Shipping: ₹0.00</p>
              <p>Tax: ₹{(calculateSubtotal() * 0.08).toFixed(2)}</p>
              <hr />
              <h5>Total: ₹{(calculateSubtotal() * 1.08).toFixed(2)}</h5>
              <Button
                variant="dark"
                className="w-100 mt-3"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
