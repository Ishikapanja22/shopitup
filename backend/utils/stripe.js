import dotenv from 'dotenv';
dotenv.config(); // <== This must be FIRST

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
