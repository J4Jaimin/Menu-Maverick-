import userModel from "../models/usermodel.js";
import foodModel from '../models/foodmodel.js';

// api for add food to cart.
const addToCart = async (req, res) => {

    const itemId = req.body.id;
    const userId = req.body.user_id;

    try {
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartItems;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        }
        else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartItems: cartData });

        res.json({
            success: true,
            message: "Added to cart!"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// api for remove food from cart.
const removeFromCart = async (req, res) => {

    const userId = req.body.user_id;
    const foodId = req.body.id;

    try {
        let userData = await userModel.findById(userId);
        let cartItems = await userData.cartItems;

        if (cartItems[foodId] === 1) {
            delete cartItems[foodId];
        }
        else {
            cartItems[foodId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartItems });

        res.status(200).json({
            success: true,
            message: "Item removed from cart."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// api for fetch all food from cart.
const fetchFood = async (req, res) => {
    const userId = req.body.user_id;

    try {
        let userData = await userModel.findById(userId);
        let cartItems = await userData.cartItems;

        res.status(200).json({
            success: true,
            cartItems,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}


export { addToCart, removeFromCart, fetchFood };
