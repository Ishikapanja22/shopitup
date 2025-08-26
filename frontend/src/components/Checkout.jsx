import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Main Checkout Form
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCart(); // ✅ Correct use of context

  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [cardholderName, setCardholderName] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    if (!stripe || !elements) return;

    if (totalAmount < 1) {
      setError("Minimum payment amount is ₹1");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const { clientSecret } = await response.json();

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardholderName,
            email: shipping.email,
            address: {
              line1: shipping.address,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.zip
            }
          }
        }
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
      }
    } catch (err) {
      console.error('Payment failed:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <div className="page" style={{ marginTop: '76px', padding: '50px 0' }}>
      <div className="container">
        <h2 className="mb-4" style={{ color: 'var(--maroon)' }}>Checkout</h2>
        <div className="row">
          <div className="col-md-8">
            {/* Shipping Information */}
            <div className="card p-4 mb-4">
              <h5>Shipping Information</h5>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" value={shipping.firstName} onChange={e => setShipping({ ...shipping, firstName: e.target.value })} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" value={shipping.lastName} onChange={e => setShipping({ ...shipping, lastName: e.target.value })} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={shipping.email} onChange={e => setShipping({ ...shipping, email: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} required />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" value={shipping.state} onChange={e => setShipping({ ...shipping, state: e.target.value })} required />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">PIN Code</label>
                    <input type="text" className="form-control" value={shipping.zip} onChange={e => setShipping({ ...shipping, zip: e.target.value })} required />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Information */}
            <div className="card p-4">
              <h5>Payment Information</h5>
              <div className="alert alert-info">
                <i className="fas fa-info-circle"></i> Secure payment powered by Stripe
              </div>
              {paymentSuccess && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle me-2"></i>Payment successful! Your order has been placed.
                </div>
              )}
              <form id="payment-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Cardholder Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cardholderName}
                    onChange={e => setCardholderName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Card Details</label>
                  <div className="p-2 border rounded">
                    <CardElement options={{ hidePostalCode: true }} />
                  </div>
                </div>

                {processing && (
                  <div className="alert alert-info">
                    <i className="fas fa-spinner fa-spin me-2"></i>Processing your payment...
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle me-2"></i>{error}
                  </div>
                )}

                <button type="submit" className="btn btn-maroon complete-payment-btn" disabled={!stripe || processing}>
                  {processing ? 'Processing...' : 'Complete Payment'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="checkout-summary">
              <h5 style={{ color: 'var(--maroon)' }}>Order Summary</h5>
              <div>
                {cartItems.length > 0 ? (
                  cartItems.map((item, idx) => (
                    <div key={idx} className="d-flex justify-content-between py-1">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Your cart is empty.</p>
                )}
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stripe Wrapper
const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
