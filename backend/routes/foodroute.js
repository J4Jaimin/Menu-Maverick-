import express from 'express';
import { addFood, fetchAllFood, removeFood, updateFood } from '../controllers/foodcontroller.js';
import multer from 'multer';


const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

// Route for add food.
foodRouter.post("/add", upload.single("image"), addFood);

// Route for fetch all foods.
foodRouter.get('/listfood', fetchAllFood);

// Route for remove food by id.
foodRouter.delete('/remove/:id', removeFood);

// Route for update food by id.
foodRouter.put('/update/:id', removeFood);

export default foodRouter;