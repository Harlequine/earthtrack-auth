import mongoose from "mongoose";

const Schema = mongoose.Schema;

const refreshToken = new Schema({
    username: {
        type: "String",
        required: true
    },
    refreshToken: {
        type: "String",
        required: true
    },
}, { timestamps: true });

refreshToken.index( { updatedAt: 1 }, { expireAfterSeconds: 2592000 } ); // expires after 30d

const model = mongoose.model("refresh-token", refreshToken);

export default model;