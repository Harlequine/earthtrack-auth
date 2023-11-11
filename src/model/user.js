import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        type: "String",
        required: true,
    },
    password: {
        type: "String",
        required: true,
    },
    roleId: {
        type: "String",
        enum: [
            "admin",
            "auditor",
            "user"
        ],
        required: true,
    }
})

const model = mongoose.model("user", user)

export default model;