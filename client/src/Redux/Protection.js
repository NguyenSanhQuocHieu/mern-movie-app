import { logoutAction } from "./Actions/userActions";

export const ErrorAction = (error, dispatch, action) => {
    const message = 
        error.response && error.response.data.message
            ? error.response.data.message 
            : error.message;
    if(message === "Not authorized, token failed") {
        dispatch(logoutAction());
    }
    return dispatch({ type: action,payload: message});
};

//api to protect
export const tokenProtectApi = (getState) => {
    const {
        userLogin: {userInfo},
    } = getState();
    if(!userInfo?.token) {
        return null;
    }else{
        return userInfo?.token;
    }
};
