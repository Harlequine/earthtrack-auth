import SUCCESS_MESSAGE from "../constants/success-message.js"
import ERROR_MESSAGE from "../constants/error-message.js"

import userService from "../service/user.js";

const authenticate = async (req, res) => {
    try {
        const tokens = await userService.authenticate(req.body);
        
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true, sameSite: "Strict", maxAge:24*60*60*1000, secure: true
        });

        return res.json({
            ...SUCCESS_MESSAGE.USER_SUCCESS_LOGIN, 
            token: tokens.accessToken
        });
    } catch (error) {
        if(error.incorrectPassword)
            return res.json(ERROR_MESSAGE.USER_ERROR_PASSWORD);
        
        return res.json(ERROR_MESSAGE.USER_NOT_FOUND);
        
    }
}

const refresh = async (req, res) => {
    try {
        const tokens = await userService.refresh(req.payload);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true, sameSite: "Strict", maxAge:24*60*60*1000, secure: true
        });

        return res.json({
            ...SUCCESS_MESSAGE.GENERAL_SUCCESS_MESSAGE, 
            token: tokens.accessToken
        });

    } catch (error) {
        res.json(ERROR_MESSAGE.TOKEN_ERROR_INVALID);
    }
}

const logout = async (req, res) => {
    try {
        await userService.logout(req.payload)

        res.clearCookie(
            'refreshToken', 
            { httpOnly: true, sameSite: 'None', secure: true }
        );

        res.json(SUCCESS_MESSAGE.USER_SUCCESS_LOGOUT);
    } catch (error) {
        console.log(error)
        res.json(ERROR_MESSAGE.GENERAL_ERROR_REQUEST)
    }
}

export default {
    authenticate,
    refresh,
    logout
}