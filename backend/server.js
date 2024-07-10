import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodroute.js';

// initialize app using express:

const app = express();
const port = 4000;

// using middlewares:

app.use(express.json());
app.use(cors());

// DB Connection

connectDB();

// API endpoints

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'));

app.get('/', (req, res) => {
    res.send("API Working..");
})

// start server

app.listen(port, () => {
    console.log(`server started on: http://localhost:${port}`);
})