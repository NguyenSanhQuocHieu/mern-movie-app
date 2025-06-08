import * as Yup from "yup";

const ReviewValidation = Yup.object({
    comment: Yup
    .string()
    .required("Comment is required")
    .max(150, "Comment must be less than 150 characters"),
    rating: Yup.number().required("Rating is required"),
});

const movieValidation = Yup.object({
    name: Yup.string().required("Please enter movie name")
    .max(50, "Movie name must be less than 50 characters"),
    time: Yup.number().required("Please enter movie time"),
    language: Yup.string().required("Please enter movie language"),
    year: Yup.number().required("Please enter movie year"),
    category: Yup.string().required("Please enter movie category"),
    // casts: Yup.array().of(Yup.string()).required("Please enter movie casts"),
    desc: Yup.string().required("Please enter movie description"),
});

export {ReviewValidation, movieValidation};

        