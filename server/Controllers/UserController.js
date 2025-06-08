import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import Movie from "../Models/MoviesModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewaves/Auth.js";

// @desc Register a new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        const userExists = await User.findOne({ email });
        //check if user already exists
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //create user in database
        const user = await User.create({
            fullName, 
            email, 
            password: hashedPassword, 
            image,
        });

        //if user is created successfully send user data and token to client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        //find user by email
        const user = await User.findOne({ email });
        //if user exists and password is correct send user data and token to client
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            }); 
        }
        else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// private controller 

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;
    try {
        //find user in database
        const user = await User.findById(req.user._id);
        //if user exists update user data and save it in database   
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();

            // Update user's name and image in all their reviews
            await Movie.updateMany(
                { "reviews.userId": updatedUser._id },
                { $set: {
                    "reviews.$[elem].userName": updatedUser.fullName,
                    "reviews.$[elem].userImage": updatedUser.image,
                } },
                { arrayFilters: [ { "elem.userId": updatedUser._id } ] }
            );

            //send user data to client
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        }
        //else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//@desc Delete user profile
//@route DELETE /api/users/profile
//@access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {           
        //find user in database
        const user = await User.findById(req.user._id);
        //if user exists delete user from database
        if (user) {
            //if user is admin throw error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete admin user");
            }
            //else delete user from database
            await User.deleteOne({ _id: req.user._id });
            res.json({ message: "User deleted successfully" });
        }   
        //else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);}
});

//@desc change user password
//@route PUT /api/users/password
//@access Private
const changeUserPassword = asyncHandler(async (req, res) => {
        const { oldPassword, newPassword } = req.body;
    try {
        //find user in database
        const user = await User.findById(req.user._id);
        //if user exists update user password and save it in database
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message: "Password changed!!" });
        }
        //else send error message
        else {
            res.status(401);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});         

//@desc get all like movies
//@route GET /api/users/favorites
//@access Private
const getLikeMovies = asyncHandler(async (req, res) => {
    try {
        //find user in database
        const user = await User.findById(req.user._id).populate("likeMovies");
        //if user exists send favorite movies to client
        if (user) {
            res.json(user.likeMovies);
        }
        //else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    });

//@desc add movie to like movies
//@route POST /api/users/favorites
//@access Private
const addLikeMovie = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        //find user in database
        const user = await User.findById(req.user._id);
        //if user exists add movie to like movies
        if (user) {
            //check if movie is already liked
            //if movie is already liked send error message
            if (user.likeMovies.includes(movieId)) {
                res.status(400);
                throw new Error("Movie already liked");
            }
            //else add movie to like movies
            user.likeMovies.push(movieId);
            await user.save();
            res.json(user.likeMovies);  
        }
        //else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});        

//@desc remove movie from like movies
//@route DELETE /api/users/favorites
//@access Private
const deleteLikeMovie = asyncHandler(async (req, res) => {
    try {
        //find user in database
        const user = await User.findById(req.user._id);
        //if user exists remove movie from like movies
        if (user) {
            user.likeMovies = [];
            await user.save();
            res.json({message: "Your favorite movies deleted successfully"});
        
        }
        //else send error message
        else {
            res.status(404);
            throw new Error("User not found");      
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//@desc delete single movie from favorites
//@route DELETE /api/users/favorites/:movieId
//@access Private
const deleteSingleLikeMovie = asyncHandler(async (req, res) => {
    try {
        const movieId = req.params.movieId;
        //find user in database
        const user = await User.findById(req.user._id);
        //if user exists remove movie from favorites
        if (user) {
            //check if movie exists in favorites
            const movieIndex = user.likeMovies.indexOf(movieId);
            if (movieIndex === -1) {
                res.status(404);
                throw new Error("Movie not found in favorites");
            }
            //remove movie from favorites
            user.likeMovies.splice(movieIndex, 1);
            await user.save();
            res.json({ message: "Movie removed from favorites" });
        }
        //else send error message
        else {
            res.status(404);
            throw new Error("User not found");      
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin controller

//@desc get all users
//@route GET /api/users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
    try {
        //find all users in database
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });}
});

//@desc delete user
//@route DELETE /api/users/:id
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    try {
        //find user in database
        const user = await User.findById(req.params.id);
        //if user exists delete user from database
        if (user) {
            //if user is admin throw error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete admin user");
            }
            //else delete user from database
            await User.deleteOne({ _id: req.params.id });
            res.json({message: "User deleted successfully"});
        }
        //else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { 
    registerUser,
    loginUser, 
    updateUserProfile, 
    deleteUserProfile, 
    changeUserPassword, 
    getLikeMovies, 
    addLikeMovie, 
    deleteLikeMovie,
    deleteSingleLikeMovie,
    getUsers,
    deleteUser,
};  