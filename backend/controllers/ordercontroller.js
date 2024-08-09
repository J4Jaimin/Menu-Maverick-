import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place order
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    console.log(req.body);

    try {

        const newOrder = new orderModel({
            userId: req.body.user_id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.user_id, { cartItems: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: req.body.deliveryCharges * 100 * 80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({
            success: true,
            session_url: session.url,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { placeOrder };