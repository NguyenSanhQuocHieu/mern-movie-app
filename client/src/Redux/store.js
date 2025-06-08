import { combineReducers,configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as Categories from "./Reducers/CategoriesReducer";
import * as movies from "./Reducers/MoviesReducer";

const rootReducer = combineReducers({
    //user reducers
    userLogin: User.userLoginReducer,
    userRegister: User.userRegisterReducer,
    userUpdateProfile: User.userUpdateProfileReducer,
    userDeleteProfile: User.userDeleteProfileReducer,
    userChangePassword: User.userChangePasswordReducer,
    userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
    userDeleteFavoriteMovie: User.userDeleteFavoriteMovieReducer,
    userDeleteSingleFavoriteMovie: User.userDeleteSingleFavoriteMovieReducer,
    adminGetAllUsers: User.adminGetAllUsersReducer,
    adminDeleteUser: User.adminDeleteUserReducer,
    userLikeMovie: User.userLikeMovieReducer,

    //categories reducers
    categoryGetAll: Categories.getAllCategoriesReducer,
    categoryCreate: Categories.createCategoryReducer,
    categoryUpdate: Categories.updateCategoryReducer,
    categoryDelete: Categories.deleteCategoryReducer,

    //movies reducers
    getAllMovies: movies.moviesListReducer,
    getRandomMovies: movies.getRandomMoviesReducer,
    getMovieDetails: movies.getMovieDetailsReducer,
    getTopRatedMovies: movies.getTopRatedMoviesReducer,
    reviewMovie: movies.createReviewReducer,
    createReview: movies.createReviewReducer,
    deleteMovie: movies.deleteMovieReducer,
    deleteAllMovies: movies.deleteAllMoviesReducer,
    createMovie: movies.createMovieReducer,
    casts: movies.castsReducer,
    updateMovie: movies.updateMovieReducer,
    updateReview: movies.updateReviewReducer,
    deleteReview: movies.deleteReviewReducer,
});

//get user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;


// initialize 
const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: true,
});


