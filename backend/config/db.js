import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jaimin19beceg120:5jKBq4i8HXLyTS3v@cluster0.4m3groq.mongodb.net/food-del')
        console.log("DB Connected successfully");
    } catch (error) {
        console.log(`Error while connecting mongodb: ${error}`);
    }
}

export default connectDB;