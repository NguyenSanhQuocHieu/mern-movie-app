import * as userConstants from "../Constants/userConstants";
import * as movieConstants from "../Constants/MoviesConstants";
import * as CategoriesConstants from "../Constants/CategoriesConstants";
import * as userApi from "../APIS/userServices";
import { toast } from "react-hot-toast";
import { ErrorAction } from "../Protection";
import { tokenProtectApi } from "../Protection";

//login action
const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch({type: userConstants.USER_LOGIN_REQUEST});
        const response = await userApi.loginService(datas);
        dispatch({type: userConstants.USER_LOGIN_SUCCESS, payload: response});
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
    }
};

// register action
const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch({type: userConstants.USER_REGISTER_REQUEST});
        const response = await userApi.registerService(datas);
        dispatch({type: userConstants.USER_REGISTER_SUCCESS, payload: response});
        dispatch({type: userConstants.USER_LOGIN_SUCCESS, payload: response});
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    }
};

// logout action
const logoutAction = () => (dispatch) => {
    userApi.logoutService();
    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_LOGIN_RESET });
    dispatch({ type: userConstants.USER_REGISTER_RESET });
    dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_RESET });
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
    dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
    dispatch({ type: userConstants.GET_FAVORITE_MOVIES_RESET });
    dispatch({ type: userConstants.GET_ALL_USERS_RESET });  
    dispatch({ type: userConstants.DELETE_USER_RESET });
    dispatch({ type: userConstants.LIKE_MOVIE_RESET });
    dispatch({ type: movieConstants.MOVIE_DETAILS_RESET });
    dispatch({ type: movieConstants.CREATE_REVIEW_RESET });
    dispatch({ type: movieConstants.CREATE_MOVIE_RESET });
    dispatch({ type: movieConstants.RESET_CAST });
    dispatch({ type: movieConstants.UPDATE_MOVIE_RESET });
    dispatch({ type: CategoriesConstants.CREATE_CATEGORY_RESET });
    dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_RESET });
    dispatch({ type: CategoriesConstants.DELETE_CATEGORY_RESET });
  };
  

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.USER_UPDATE_PROFILE_REQUEST});
        const response = await userApi.updateProfileUserService(user, tokenProtectApi(getState));
        dispatch({
            type: userConstants.USER_UPDATE_PROFILE_SUCCESS, 
            payload: response,
        });
        toast.success("Profile updated successfully");
        dispatch({
            type: userConstants.USER_LOGIN_SUCCESS,
            payload: response,
        });
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.USER_DELETE_PROFILE_REQUEST});
        await userApi.deleteUserService(tokenProtectApi(getState));
        dispatch({type: userConstants.USER_DELETE_PROFILE_SUCCESS});
        toast.success("Profile deleted successfully");
        dispatch(logoutAction());
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    }
};

//change password action
const changePasswordAction = (passwordData) => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.USER_CHANGE_PASSWORD_REQUEST});
        const response = await userApi.changePasswordService(
            passwordData, 
            tokenProtectApi(getState)
        );
        dispatch({
            type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, 
            payload: response
        });
        toast.success("Password changed successfully");
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
}

//get all favorite movies
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.GET_FAVORITE_MOVIES_REQUEST});
        const response = await userApi.getFavoriteMovies(tokenProtectApi(getState));    
        dispatch({
            type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
            payload: response
        });

    } catch (error) {
        ErrorAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
    }
};

//delete favorite movie
const deleteFavoriteMovieAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST});
        await userApi.deleteFavoriteMovies(tokenProtectApi(getState));
        dispatch({type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS});
        toast.success("Favorite movie deleted successfully");
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIES_FAIL);
    }
};

//delete single favorite movie
const deleteSingleFavoriteMovieAction = (movieId) => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.DELETE_SINGLE_FAVORITE_MOVIE_REQUEST});
        await userApi.deleteSingleFavoriteMovie(movieId, tokenProtectApi(getState));
        dispatch({type: userConstants.DELETE_SINGLE_FAVORITE_MOVIE_SUCCESS});
        toast.success("Movie removed from favorites");
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.DELETE_SINGLE_FAVORITE_MOVIE_FAIL);
    }
};

//admin get all users
const getAllUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.GET_ALL_USERS_REQUEST});
        const response = await userApi.getAllUsersService(tokenProtectApi(getState));
        dispatch({type: userConstants.GET_ALL_USERS_SUCCESS, payload: response});
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
    }
};

//admin delete user
const deleteUserAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.DELETE_USER_REQUEST});
        await userApi.deleteUserAdminService(id, tokenProtectApi(getState));
        dispatch({type: userConstants.DELETE_USER_SUCCESS});
        toast.success("User deleted successfully");
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.DELETE_USER_FAIL);
    }
};

//user like movie
const likeMovieAction = (movieId) => async (dispatch, getState) => {
    try {
        dispatch({type: userConstants.LIKE_MOVIE_REQUEST});
        const response = await userApi.likeMovieService(
            movieId, 
            tokenProtectApi(getState)
        );
        dispatch({
            type: userConstants.LIKE_MOVIE_SUCCESS,
            payload: response
        });
        toast.success("Movie liked successfully");
    } catch (error) {
        ErrorAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
    }
};


export {
    loginAction, 
    registerAction, 
    logoutAction, 
    updateProfileAction, 
    deleteProfileAction, 
    changePasswordAction,
    getFavoriteMoviesAction,
    deleteFavoriteMovieAction,
    deleteSingleFavoriteMovieAction,
    getAllUsersAction,
    deleteUserAction,
    likeMovieAction
};
