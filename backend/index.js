require('dotenv').config()
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cookieParser = require('cookie-parser');
const { createProduct } = require('./src/controller/Product.controller.js');
const productsRouter = require('./src/routes/Products.route.js');
const categoriesRouter = require('./src/routes/Categories.route.js');
const brandsRouter = require('./src/routes/Brands.route.js');
const usersRouter = require('./src/routes/Users.route.js');
const authRouter = require('./src/routes/Auth.route.js');
const cartRouter = require('./src/routes/Carts.route.js');
const ordersRouter = require('./src/routes/Orders.route.js');
const { User } = require('./src/model/User.model.js');
const { isAuth, sanitizeUser, cookieExtractor } = require('./src/services/common.services.js');
const path = require('path')


// Webhooks
const endpointSecret = process.env.ENDPOINT_SECRET;

server.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
        // ... handle other event types
        default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});



//middlewares

server.use(express.static(path.resolve(__dirname,'build')))
server.use(cookieParser());
 
server.use(
    cors({
        exposedHeaders: ['X-Total-Count'],
    })
);

server.use(express.json()); // to parse req.body
server.use('/products', productsRouter.router);
// we can also use JWT token for client-only auth
server.use('/categories',  categoriesRouter.router);
server.use('/brands',  brandsRouter.router);
server.use('/users',  usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',  cartRouter.router);
server.use('/orders', ordersRouter.router);



//Creating PaymentIntent witht hte order amount and currency

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

server.post("/create-payment-intent", async (req, res) => {
    const { totalAmount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount*100,
        currency: "inr",
        automatic_payment_methods: {
        enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});




//mongoDb database connect
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('database connected');
}

server.listen(process.env.PORT, () => {
    console.log('server started',process.env.PORT);
});