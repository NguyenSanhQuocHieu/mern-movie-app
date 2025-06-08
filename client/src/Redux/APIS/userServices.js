import Axios from "./Axios";

// public api

// Register new user api call
const registerService = async (user) => {
    const { data } = await Axios.post("/users", user);
    if(data){
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

//logout user function
const logoutService = async () => {
    localStorage.removeItem("userInfo");
    return null;
};

//login user api call
const loginService = async (user) => {
    const {data} = await Axios.post("/users/login", user);
    if(data){
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
};

// private api

//update user api call
const updateProfileUserService = async (user, token) => {
    const {data} = await Axios.put("/users", user,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if(data){
        localStorage.setItem("userInfo", JSON.stringify(data));
    }return data;
};

//delete user api call
const deleteUserService = async (token) => {
    const {data} = await Axios.delete("/users",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if(data){
        localStorage.removeItem("userInfo");
    }
    return data;
};

//change password api call
const changePasswordService = async (passwordData, token) => {
    const {data} = await Axios.put("/users/password", passwordData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//get all favorite movies
const getFavoriteMovies = async (token) => {
    const {data} = await Axios.get("/users/favorites", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//delete favorite movie
const deleteFavoriteMovies = async (token) => {
    const {data} = await Axios.delete("/users/favorites", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//like movie
const likeMovieService = async (movieId, token) => {
    const {data} = await Axios.post(`/users/favorites/`, movieId, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//delete single favorite movie
const deleteSingleFavoriteMovie = async (movieId, token) => {
    const {data} = await Axios.delete(`/users/favorites/${movieId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// admin api

//admin get all users
const getAllUsersService = async (token) => {
    const {data} = await Axios.get("/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//admin delete user
const deleteUserAdminService = async (id, token) => {
    const {data} = await Axios.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};


export {
    registerService, 
    logoutService, 
    loginService, 
    updateProfileUserService, 
    deleteUserService, 
    changePasswordService,
    getFavoriteMovies,
    deleteFavoriteMovies,
    deleteSingleFavoriteMovie,
    getAllUsersService,
    deleteUserAdminService,
    likeMovieService
};




