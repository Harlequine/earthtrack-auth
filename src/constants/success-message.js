import STATUS_CODE from './status-code.js'
import STATUS from './status.js'

const successMessage = {
    //general success message
    GENERAL_SUCCESS_MESSAGE:{
        status: STATUS.OK,
        statusCode: STATUS_CODE.SUCCESS,
        message: 'Success', 
    },
    // user success message
    USER_SUCCESS_REGISTRATION: {
        status: STATUS.OK,
        statusCode: STATUS_CODE.CREATED,
        message: 'User Registration Successful',
    },
    USER_SUCCESS_LOGIN: {
        status: STATUS.OK,
        statusCode:STATUS_CODE.SUCCESS,
        message:'Login Successfully'
    },
    USER_SUCCESS_LOGOUT: {
        status: STATUS.OK,
        statusCode:STATUS_CODE.SUCCESS,
        message:'Logout Successfully'
    }
    
}
export default successMessage;