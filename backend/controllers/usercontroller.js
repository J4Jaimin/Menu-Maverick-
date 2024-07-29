import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login api
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "Email doesn't exist please sign up!",
            })
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.json({
                success: false,
                message: "Invalid email or password.",
            })
        }

        const token = createToken(user._id);

        res.json({
            success: true,
            message: "Login Successful",
            token,
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message || error,
        })
    }


}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// register api
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        // if user already exist
        const existUser = await userModel.findOne({ email });

        if (existUser) {
            return res.json({
                success: false,
                message: "User already exist."
            })
        }

        // validate email address.
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email."
            })
        }

        // validate strong password
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password."
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const newUser = await user.save()
        const token = createToken(newUser._id);

        res.json({
            success: true,
            token,
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message || error,
        })
    }
}


export { loginUser, registerUser };