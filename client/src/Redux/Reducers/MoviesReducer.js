import * as moviesConstants from "../Constants/MoviesConstants";

// get all movies reducer
export const moviesListReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_LIST_REQUEST:
            return {isLoading: true};
        case moviesConstants.MOVIES_LIST_SUCCESS:
            return {
                isLoading: false,
                movies: action.payload.movies,
                pages: action.payload.pages,
                page: action.payload.page,
                totalMovies: action.payload.totalMovies,
            };
        case moviesConstants.MOVIES_LIST_FAIL:
            return {isLoading: false,isError: action.payload,};
        default:
            return state;
    }
};

//get random movies reducer
export const getRandomMoviesReducer = (state = {movies: []}, action) => {
    switch (action.type) {
        case moviesConstants.MOVIES_RANDOM_REQUEST:
            return {isLoading: true};
        case moviesConstants.MOVIES_RANDOM_SUCCESS:
            return {isLoading: false,movies: action.payload};
        case moviesConstants.MOVIES_RANDOM_FAIL:    
            return {isLoading: false,isError: action.payload,};
        default:
            return state;
    }
};

//get movie details reducer
export const getMovieDetailsReducer = (state = {movie: {}}, action) => {
    switch (action.type) {
        case moviesConstants.MOVIE_DETAILS_REQUEST:
            return {isLoading: true};
        case moviesConstants.MOVIE_DETAILS_SUCCESS:
            return {isLoading: false,movie: action.payload};
        case moviesConstants.MOVIE_DETAILS_FAIL:
            return {isLoading: false,isError: action.payload,}; 
        case moviesConstants.MOVIE_DETAILS_RESET:
            return {movie: {}};
        default:
            return state;
    }
};


//get top rated movies reducer
export const getTopRatedMoviesReducer = (state = {movies: []}, action) => {
    switch (action.type) {
        case moviesConstants.MOVIE_TOP_RATED_REQUEST:
            return {isLoading: true};
        case moviesConstants.MOVIE_TOP_RATED_SUCCESS:
            return {isLoading: false,movies: action.payload};
        case moviesConstants.MOVIE_TOP_RATED_FAIL:
            return {isLoading: false,isError: action.payload,};
        default:
            return state;
    }
};

//create review reducer
export const createReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.CREATE_REVIEW_REQUEST:
            return {isLoading: true};
        case moviesConstants.CREATE_REVIEW_SUCCESS:
            return {isLoading: false,isSuccess: true};
        case moviesConstants.CREATE_REVIEW_FAIL:
            return {isLoading: false,isError: action.payload,};
        case moviesConstants.CREATE_REVIEW_RESET:
            return {};  
        default:
            return state;   
    }
};

// Update review reducer
export const updateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.UPDATE_REVIEW_REQUEST:
            return { isLoading: true };
        case moviesConstants.UPDATE_REVIEW_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case moviesConstants.UPDATE_REVIEW_FAIL:
            return { isLoading: false, isError: action.payload };
        case moviesConstants.UPDATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

// Delete review reducer
export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.DELETE_REVIEW_REQUEST:
            return { isLoading: true };
        case moviesConstants.DELETE_REVIEW_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case moviesConstants.DELETE_REVIEW_FAIL:
            return { isLoading: false, isError: action.payload };
        case moviesConstants.DELETE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};

//delete movie reducer
export const deleteMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.DELETE_MOVIE_REQUEST:
            return {isLoading: true};
        case moviesConstants.DELETE_MOVIE_SUCCESS:
            return {isLoading: false,isSuccess: true};
        case moviesConstants.DELETE_MOVIE_FAIL:
            return {isLoading: false,isError: action.payload,};
        default:
            return state;
    }
};

//delete all movies reducer
export const deleteAllMoviesReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.DELETE_ALL_MOVIES_REQUEST:
            return {isLoading: true};
        case moviesConstants.DELETE_ALL_MOVIES_SUCCESS:
            return {isLoading: false,isSuccess: true};
        case moviesConstants.DELETE_ALL_MOVIES_FAIL:
            return {isLoading: false,isError: action.payload,};
        default:
            return state;
    }
};

//create movie reducer
export const createMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.CREATE_MOVIE_REQUEST:
            return {isLoading: true};
        case moviesConstants.CREATE_MOVIE_SUCCESS:
            return {isLoading: false,isSuccess: true};
        case moviesConstants.CREATE_MOVIE_FAIL:
            return {isLoading: false,isError: action.payload,};
        case moviesConstants.CREATE_MOVIE_RESET:
            return {};
        default:
            return state;
    }
};

//casts reducer
export const castsReducer = (state = {casts: []}, action) => {
    switch (action.type) {
        case moviesConstants.ADD_CAST:
            return {casts: [...state.casts, action.payload]};
        case moviesConstants.EDIT_CAST:
            const updatedCasts = state.casts.map((item) => {
                if ((item._id && item._id === action.payload.cast._id) ||
                    (item.id && item.id === action.payload.cast.id)) {
                    return action.payload.cast;
                }
                return item;
            });
            return {
                casts: updatedCasts
            };
        case moviesConstants.DELETE_CAST:
            return {
                ...state,
                casts: state.casts.filter((cast) =>
                    (cast._id && cast._id !== action.payload) ||
                    (cast.id && cast.id !== action.payload)
                )
            };
        case moviesConstants.RESET_CAST:
            return {casts: []};
        case moviesConstants.SET_CASTS:
            return { casts: action.payload || [] };
        case moviesConstants.RESET_CASTS:
            return { casts: [] };
        default:
            return state;
    }
};

//update movie reducer
export const updateMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.UPDATE_MOVIE_REQUEST:
            return {isLoading: true};
        case moviesConstants.UPDATE_MOVIE_SUCCESS:
            return {isLoading: false,isSuccess: true};
        case moviesConstants.UPDATE_MOVIE_FAIL:
            return {isLoading: false,isError: action.payload,};
        case moviesConstants.UPDATE_MOVIE_RESET:
            return {};
        default:
            return state;
    }
};

// Report review reducer
export const reportReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case moviesConstants.REPORT_REVIEW_REQUEST:
            return { isLoading: true };
        case moviesConstants.REPORT_REVIEW_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case moviesConstants.REPORT_REVIEW_FAIL:
            return { isLoading: false, isError: action.payload };
        case moviesConstants.REPORT_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};