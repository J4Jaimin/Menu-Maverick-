import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodroute.js';
import userRouter from './routes/userroute.js';
import 'dotenv/config';
import cartRouter from './routes/cartroute.js';
import orderRouter from './routes/orderroute.js';
// import authmiddleware from './middleware/authmiddleware.js';

// initialize app using express:

const app = express();
const port = 4000;

// using middlewares:

app.use(express.json());
app.use(cors());
// app.use(authmiddleware);

// DB Connection

connectDB();

// API endpoints

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send("API Working..");
})

// start server

app.listen(port, () => {
    console.log(`server started on: http://localhost:${port}`);
})