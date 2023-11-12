import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import USERS from "../model/user.js";
import REFRESH_TOKEN from "../model/refresh-token.js"

const authenticate = async (reqBody) => {
    try {
        const { username, password } = reqBody;
        const user = await USERS.findOne({username: username});

        if(!user){//if user is not found
            throw ({notFound:true});
        }

        const compare = await bcrypt.compare(password, user.password);

        if(!compare){//if password is incorrect
            throw ({incorrectPassword: true});
        }

        const accessToken = jwt.sign(
            { "roleId": user.roleId, "username": user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        );

        const refreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "30d"}
        );

        await REFRESH_TOKEN.updateOne({ username: username }, 
            { $set: { username: username, refreshToken: refreshToken } },
            { upsert: true }
        );

        return { accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
}

const refresh = async (reqBody) => {
    const { username } = reqBody

    const user = await USERS.findOne(
        { username: username }
    );

    if(!user){//if user not found
        throw error;
    }

    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d"}
    );

    const accessToken = jwt.sign({
        "roleId": user.roleId,
        "username": user.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    );

    const token = await REFRESH_TOKEN.findOneAndUpdate({username:username},
        { $set : { refreshToken: refreshToken } }
    );

    if(!token){//if token does not exist
        throw error;
    }
        return { accessToken, refreshToken };

}

const logout = async (reqBody) => {
    try {
        const { username } = reqBody;
        await REFRESH_TOKEN.findOneAndDelete({username: username});
    } catch (error) {
        throw error;
    }
}

export default {
    authenticate,
    refresh,
    logout
}