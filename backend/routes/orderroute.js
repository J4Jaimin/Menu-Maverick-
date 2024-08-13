import express from 'express';
import { placeOrder, verifyPayment } from '../controllers/ordercontroller.js';
import { authorizeUser } from '../middleware/authmiddleware.js';

const orderRouter = express.Router();

// router for place order.
orderRouter.post('/placeorder', authorizeUser, placeOrder);

// route for verify payment.
orderRouter.post('/verify', verifyPayment);


export default orderRouter;