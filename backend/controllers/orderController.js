import stripe from '../utils/stripe.js';

export const createCheckoutSession = async (req, res) => {
  const { items } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.json({ id: session.id });
};
// controllers/orderController.js

export const getMyOrders = async (req, res) => {
  try {
    // Fetch orders based on logged in user
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error('Get Orders Error:', error.message);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};
