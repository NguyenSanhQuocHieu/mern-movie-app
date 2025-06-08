import Categories from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";

//public controllers
//@desc Get all categories
//@route GET /api/categories
//@access Public

const getCategories = asyncHandler(async (req, res) => {
    try {
        //find all categories
        const categories = await Categories.find();
        //send the categories to the client
        res.json(categories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//admin controllers

//@desc create category
//@route POST /api/categories
//@access Private/Admin

const createCategory = asyncHandler(async (req, res) => {
    try {
        //get the title from the request body
        const {title} = req.body;

        // check if category already exists
        const existingCategory = await Categories.findOne({ 
            title: { $regex: new RegExp(`^${title}$`, 'i') } 
        });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        //create a new category
        const category = new Categories({
            title
        });
        //save the category
        const createdCategory = await category.save();
        //send the category to the client
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//@desc update category
//@route PUT /api/categories/:id
//@access Private/Admin

const updateCategory = asyncHandler(async (req, res) => {
    try {
        //get the id from the request params
        const category = await Categories.findById(req.params.id);
        
        if(category){
            //update category title
            category.title = req.body.title || category.title;
            //save the category
            const updatedCategory = await category.save();
            //send the updated category to the client
            res.json(updatedCategory);
        }else {
            res.status(404).json({message: "Category not found"});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }   
});


//@desc delete category
//@route DELETE /api/categories/:id
//@access Private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
    try{
        //get the id from the request params
        const category = await Categories.findById(req.params.id);
        //if the category is found, delete it
        if(category){
            //delete the category
            await category.deleteOne();
            //send the deleted category to the client
            res.json({message: "Category deleted successfully"});
        }else {
            res.status(404).json({message: "Category not found"});  
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

export {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};


