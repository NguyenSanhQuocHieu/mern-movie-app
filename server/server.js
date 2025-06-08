import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewaves/errorMiddlewave.js";
import userRoutes from "./Routes/UserRouter.js";
import moviesRoutes from "./Routes/MoviesRouter.js";
import categoriesRouter from "./Routes/CategoriesRouter.js";
import Uploadrouter from "./Controllers/UploadFile.js";
dotenv.config();    

const app = express();
app.use(cors());
app.use(express.json());
//connect to the database
connectDB();

//main route
app.get("/", (req, res) => {
    res.send("API is running.....");
});
//other routes
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", Uploadrouter);

//error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost/${PORT}`);
});

