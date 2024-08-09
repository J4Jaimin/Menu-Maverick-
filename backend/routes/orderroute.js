import express from 'express';
import { placeOrder } from '../controllers/ordercontroller.js';
import { authorizeUser } from '../middleware/authmiddleware.js';

const orderRouter = express.Router();

// router for place order.
orderRouter.post('/placeorder', authorizeUser, placeOrder);


export default orderRouter;