
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  
if (!amount || amount < 50) {
  return res.status(400).json({ error: "Amount must be at least 50 cents" });
}
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
