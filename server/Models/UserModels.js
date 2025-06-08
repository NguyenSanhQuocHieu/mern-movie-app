import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "please add full name"],
    },
    email: {
        type: String,
        required: [true, "please add an email"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "please add a password"],
        minlength: [8, "password must be at least 6 characters"],
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    likeMovies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movies",
        },
    ],
},
{
    timestamps: true
}
);



export default mongoose.model("User", userSchema);
