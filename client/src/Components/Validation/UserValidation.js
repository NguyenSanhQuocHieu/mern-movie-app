import * as Yup from "yup";

// login validation
const LoginValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required").trim(),
    password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be less than 30 characters long")
    .matches(/(?=.*[0-9])/, "Password must contain a number")
});

// register validation
const RegisterValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required").trim(),
    password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be less than 30 characters long")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
    fullName: Yup.string()
    .required("Full name is required")
    .max(30, "Full name must be less than 30 characters long")
    .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Full name cannot contain special characters (!@#$%^&*,...)"
    ),
});


const ProfileValidation = Yup.object().shape({
    fullName: Yup.string()
    .required("Full name is required")
    .max(30, "Full name must be less than 30 characters long")
    .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Full name cannot contain special characters (!@#$%^&*,...)"
    ),
    email: Yup.string().email("Invalid email").required("Email is required").trim(),
    
});

const PasswordValidation = Yup.object().shape({
    oldPassword: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(30, "Password must be less than 30 characters long")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
    newPassword: Yup.string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters long")
    .max(30, "New password must be less than 30 characters long")
    .matches(/(?=.*[0-9])/, "New password must contain a number"),
    confirmPassword: Yup.string()
    .required("Confirm password is required")
    .min(6, "Confirm password must be at least 6 characters long")
    .max(30, "Confirm password must be less than 30 characters long")
    .matches(/(?=.*[0-9])/, "Confirm password must contain a number")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
});

export {
    LoginValidation, 
    RegisterValidation, 
    ProfileValidation, 
    PasswordValidation
};
