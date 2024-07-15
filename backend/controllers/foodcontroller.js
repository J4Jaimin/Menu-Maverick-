import foodModel from "../models/foodmodel.js";
import fs from 'fs';

// add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added successfully!" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Fetch all foods

const fetchAllFood = async (req, res) => {

    try {
        const allFoods = await foodModel.find();

        if (allFoods.length > 0) {
            res.json({
                success: true,
                message: `There are total ${allFoods.length} food available.`,
                foods_available: allFoods,
            });
        }

        else {
            res.json({
                success: true,
                message: "No Food is available, please add food.",
                foods_available: [],
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error,
        })
    }
}

// Remove food item

const removeFood = async (req, res, next) => {

    const foodToBeRemove = await foodModel.findById(req.params.id);

    const path = `uploads/${foodToBeRemove.image}`;

    if (!foodToBeRemove) {
        res.json({
            success: false,
            message: `Product not found at this ${req.params.id}`,
        })
        return;
    }

    try {
        // remove image file from system.

        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
            }
        });

        await foodModel.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: `Food removed successfully`,
        })

    } catch (error) {
        res.json({
            success: false,
            message: error,
        });
    }
}

const updateFood = async (req, res, next) => {

}

export { addFood, fetchAllFood, removeFood, updateFood };