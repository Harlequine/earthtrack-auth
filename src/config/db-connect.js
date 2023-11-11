import mongoose from "mongoose";

const connection = () => {
    mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("MongoDB connection established");
    }).catch((error) => {
        console.log(error)
    })
}

export default connection