import jwt from "jsonwebtoken";

import ERROR_MESSAGE from "../constants/error-message.js"

const refresh = async(req, res, next) => {
    try {
        const token = req.cookies.refreshToken
        if(!token){
            return res.json(ERROR_MESSAGE.ACCESS_ERROR_FORBIDDEN)
        }
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET,
            (error,decoded) =>{
                if(error){
                    if(error.message === "jwt expired"){
                        return res.json(ERROR_MESSAGE.EXPIRED_REFRESH_TOKEN)
                    }
                    else{
                        return res.json(ERROR_MESSAGE.TOKEN_ERROR_INVALID)
                    }
                }

                const { username } = decoded; 

                if(!username){
                    return res.json(ERROR_MESSAGE.ERROR_UNAUTHORIZED_ACCESS);
                }

                req.payload = decoded;
                next();
        })
    } catch (error) {
        return res.json(ERROR_MESSAGE.GENERAL_ERROR_REQUEST);
    }
}

export default refresh
