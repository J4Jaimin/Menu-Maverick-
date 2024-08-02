import express from 'express';
import { addToCart, removeFromCart, fetchFood } from '../controllers/cartcontroller.js';
import { authorizeUser } from '../middleware/authmiddleware.js';


const cartRouter = express.Router();

// route for add food to user cart.
cartRouter.post("/add", authorizeUser, addToCart);

// route for remove food from user cart.
cartRouter.post('/remove', authorizeUser, removeFromCart);

// route for fetch all food availble in user cart.
cartRouter.get('/get', authorizeUser, fetchFood);



export default cartRouter;