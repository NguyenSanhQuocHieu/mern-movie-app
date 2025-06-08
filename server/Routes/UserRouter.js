import express from "express";
import {
    loginUser ,
    registerUser ,
    updateUserProfile,  
    deleteUserProfile,
    changeUserPassword,
    getLikeMovies,
    addLikeMovie,
    deleteLikeMovie,
    getUsers,
    deleteUser,
    deleteSingleLikeMovie
} from "../Controllers/UserController.js";
import { protect, admin } from "../middlewaves/Auth.js";

const router = express.Router();

//public routes
router.post("/", registerUser);
router.post("/login", loginUser);

//private routes
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikeMovies);
router.post("/favorites", protect, addLikeMovie);
router.delete("/favorites", protect, deleteLikeMovie);
router.delete("/favorites/:movieId", protect, deleteSingleLikeMovie);

//admin routes
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router;

