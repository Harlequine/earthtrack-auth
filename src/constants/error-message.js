import STATUS from './status.js'
import STATUS_CODE from './status-code.js'
const status = STATUS.FAILED;

const errorMessage = {
   //general e
    GENERAL_ERROR_REQUEST: {
        status,
        statusCode:STATUS_CODE.FAILED,
        message:'Something Went Wrong.',
    },

    USER_NOT_FOUND: {
        status,
        statusCode: STATUS_CODE.NOT_FOUND,
        message:'User Not Found.'
    },
    USER_ERROR_LOGIN: {
        status,
        statusCode:STATUS_CODE.CONFLICT,
        message:'User Already Logged In.',
    },
    USER_ERROR_PASSWORD: {
        status,
        statusCode:STATUS_CODE.CONFLICT,
        message:'Incorrect Password.',
    },
    
    //access error
    ERROR_UNAUTHORIZED_ACCESS:{
        status,
        statusCode: STATUS_CODE.UNAUTHORIZED,
        message: 'Unauthorized Access.',
    },
    ACCESS_ERROR_FORBIDDEN: {
        status,
        statusCode:STATUS_CODE.FORBIDDEN,
        message:'Forbidden From Accessing URL.'
    },
    //token error
    TOKEN_ERROR_INVALID: {
        status,
        statusCode:STATUS_CODE.FORBIDDEN,
        message:'Invalid Token.'
    },
    EXPIRED_REFRESH_TOKEN: {
        status,
        statusCode:STATUS_CODE.FORBIDDEN,
        message:'Refresh Token Expired. Please Log-in.'
    }
}

export default errorMessage