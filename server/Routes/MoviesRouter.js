import express from "express";
import * as MoviesController from "../Controllers/MoviesController.js";
import {protect,admin} from "../middlewaves/Auth.js";

const router = express.Router();

//public routes
router.post("/import",MoviesController.importMovies);
router.get("/",MoviesController.getMovies);
router.get("/:id",MoviesController.getMovieById);    
router.get("/rated/top",MoviesController.getTopRatedMovies);
router.get("/random/all",MoviesController.getRandomMovies);

//private routes
router.post("/:id/review",protect,MoviesController.createMovieReview);
router.put("/:movieId/review/:reviewId", protect, MoviesController.updateMovieReview);
router.delete("/:movieId/review/:reviewId", protect, MoviesController.deleteMovieReview);
router.post("/:movieId/review/:reviewId/report", protect, MoviesController.reportMovieReview);

//admin routes
router.put("/:id",protect,admin,MoviesController.updateMovie);
router.delete("/:id",protect,admin,MoviesController.deleteMovie);
router.delete("/",protect,admin,MoviesController.deleteAllMovies);
router.post("/",protect,admin,MoviesController.createMovie);
export default router;
