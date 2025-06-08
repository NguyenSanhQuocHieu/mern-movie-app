import {MoviesData} from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler";

// ********** PUBLIC CONTROLLERS **********
// @desc    import movies
// @route   POST /api/movies/import
// @access  Public

const importMovies = asyncHandler(async (req, res) => {
    //first we make sure our Movies table is empty by delete all documents
    await Movie.deleteMany({});
    //then we insert all movies from MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

//@desc get all movies
//@route GET /api/movies
//@access Public

const getMovies = asyncHandler(async (req, res) => {
    try {
        //filter movies by category,time,language,rate,year and search
        const { category,time,language,rate,year,search} = req.query;
        let query = {   
            ...category && ({category}),
            ...time && ({time}),
            ...language && ({language}),
            ...rate && ({rate}),
            ...year && ({year}),
            ...search && ({name: {$regex: search, $options: "i"}}),
        };

        //load more move functionality
        const page = Number(req.query.pageNumber) || 1; //if page is not provided, it will be 1
        const limit = 15;//2 movies per page
        const skip = (page - 1) * limit;//skip 2 movies per page

        //find movies by query,skip and limit
        const movies = await Movie.find(query)
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        //get total number of    movies
        const count = await Movie.countDocuments(query);

        // send response with movies and total number of movies
        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit), //total pages
            totalMovies: count, //total number of movies
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//@desc get movie by id 
//@route GET /api/movies/:id
//@access Public

const getMovieById = asyncHandler(async (req, res) => {
    try {
        //find movie by id
        const movie = await Movie.findById(req.params.id);
        //if the movie if found, send it to the client
        if (movie) {
            res.json(movie);
        }
        //if the movie is not found, send 404 error
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//@desc get top rated movies
//@route GET /api/movies/rated/top
//@access Public

const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        //find top rated movies
        const movies = await Movie.find({}).sort({rate: -1});
        //send response with top rated movies
        res.json(movies);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//@desc get random movies
//@route GET /api/movies/random/all
//@access Public

const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        //find random movies
        const movies = await Movie.aggregate([{$sample: {size: 8}}]);
        //send response with random movies
        res.json(movies);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// ********** PRIVATE CONTROLLERS **********

//@desc create movie review
//@route POST /api/movies/:id/reviews
//@access Private

const createMovieReview = asyncHandler(async (req, res) => {
    const {rating,comment} = req.body;
    try {
        //find movie by id
        const movie = await Movie.findById(req.params.id);

        if(movie){
            //check if the user has already reviewed the movie
            const alreadyReviewed = movie.reviews.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );
            //if the user has already reviewed the movie, send 400 error
            if(alreadyReviewed){
                res.status(400);
                throw new Error("You already reviewed this movie");
            }
            //else create a review
            const review = {
                userName: req.user.fullName,
                userId: req.user.id,
                userImage: req.user.image,
                rating: Number(rating),
                comment,
            }
            //push the review to the movie
            movie.reviews.push(review);
            //increment the number of reviews
            movie.numberOfReviews = movie.reviews.length;

            //calculate the new rate
            movie.rate = movie.reviews.reduce((acc,item) => acc + review.rating + acc,0) / movie.reviews.length;
        
            //save the movie
            await movie.save();
            //send the new movie to the client
            res.status(201).json({
                message: "Review added successfully"
            });

            }else {
                res.status(404);
                throw new Error("Movie not found");
            }
                   
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Update movie review
const updateMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (movie) {
            const review = movie.reviews.id(req.params.reviewId);
            if (review) {
                // Check if user is review owner
                if (review.userId.toString() === req.user._id.toString()) {
                    review.rating = Number(rating);
                    review.comment = comment;

                    // Recalculate average rating
                    movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;
                    
                    await movie.save();
                    res.json({ message: "Review updated successfully" });
                } else {
                    res.status(403);
                    throw new Error("You can only edit your own reviews");
                }
            } else {
                res.status(404);
                throw new Error("Review not found");
            }
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete movie review
const deleteMovieReview = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (movie) {
            const review = movie.reviews.id(req.params.reviewId);
            if (review) {
                // Check if user is admin or review owner
                if (req.user.isAdmin || review.userId.toString() === req.user._id.toString()) {
                    movie.reviews = movie.reviews.filter(
                        (r) => r._id.toString() !== req.params.reviewId
                    );
                    
                    // Update number of reviews and recalculate average rating
                    movie.numberOfReviews = movie.reviews.length;
                    if (movie.reviews.length > 0) {
                        movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;
                    } else {
                        movie.rate = 0;
                    }
                    
                    await movie.save();
                    res.json({ message: "Review deleted successfully" });
                } else {
                    res.status(403);
                    throw new Error("You can only delete your own reviews");
                }
            } else {
                res.status(404);
                throw new Error("Review not found");
            }
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Report movie review
const reportMovieReview = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (movie) {
            const review = movie.reviews.id(req.params.reviewId);
            if (review) {
                // Chỉ admin mới có thể báo cáo
                if (req.user.isAdmin) {
                    review.isReported = true;
                    review.reportedBy = req.user._id;
                    
                    await movie.save();
                    res.json({ message: "Review has been reported" });
                } else {
                    res.status(403);
                    throw new Error("Only admin can report reviews");
                }
            } else {
                res.status(404);
                throw new Error("Review not found");
            }
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//admin controllers

//@desc update movie
//@route PUT /api/movies/:id
//@access Private/Admin

const updateMovie = asyncHandler(async (req, res) => {
    try {
        //get data from request body
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            cast   
        } = req.body;

        //find movie by id
        const movie = await Movie.findById(req.params.id);

        if(movie){
            //update the movie
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.rate = rate || movie.rate;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.cast = cast || movie.cast;

            //save the movie
            const updatedMovie = await movie.save();
            //send the updated movie to the client
            res.status(200).json(updatedMovie);

        }else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//@desc delete movie
//@route DELETE /api/movies/:id 
//@access Private/Admin

const deleteMovie = asyncHandler(async (req, res) => {
    try {
        //find movie by id
        const movie = await Movie.findById(req.params.id);
        //if the movie is found, delete it
        if(movie){
            await Movie.deleteOne({ _id: req.params.id });  
            res.json({message: "Movie deleted successfully"});
        }
        //if the movie is not found, send 404 error
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//@desc delete all movies
//@route DELETE /api/movies
//@access Private/Admin

const deleteAllMovies = asyncHandler(async (req, res) => {
    try {   
        //delete all movies
        await Movie.deleteMany({});
        res.json({message: "All movies deleted successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//@desc create movie
//@route POST /api/movies
//@access Private/Admin

const createMovie = asyncHandler(async (req, res) => {
    try {
        //get data from request body
        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts   // Đổi tên từ cast thành casts để đồng nhất
        } = req.body;

        // Validate casts array
        if (!Array.isArray(casts)) {
            res.status(400);
            throw new Error("Casts must be an array");
        }

        //create movie
        const movie = new Movie({
            name,
            desc,
            image,
            titleImage,
            rate: rate || 0,
            numberOfReviews: numberOfReviews || 0,
            category,
            time,
            language,
            year,
            video,
            cast: casts.map(cast => ({  // Map casts array to match schema
                name: cast.name,
                image: cast.image
            })),
            userId: req.user._id, 
        });

        //save movie
        if(movie){
           const createdMovie = await movie.save();
           res.status(201).json(createdMovie);
        }
        else {
            res.status(400);
            throw new Error("Invalid movie data");
        }

    } catch (error) {
        console.error("Create movie error:", error);
        res.status(400).json({message: error.message});
    }
});

export {
    importMovies, 
    getMovies, 
    getMovieById, 
    getTopRatedMovies, 
    getRandomMovies,
    createMovieReview,
    updateMovie,
    deleteMovie,
    deleteAllMovies,
    createMovie,
    updateMovieReview,
    deleteMovieReview,
    reportMovieReview,
};  




