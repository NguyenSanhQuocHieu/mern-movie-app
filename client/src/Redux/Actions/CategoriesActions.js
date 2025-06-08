import * as CategoriesConstants from "../Constants/CategoriesConstants";
import * as categoriesAPIs from "../APIS/CategoriesServices";
import {ErrorAction , tokenProtectApi } from "../Protection"
import { toast } from "react-hot-toast";

//get all categories
export const getAllCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({type: CategoriesConstants.GET_CATEGORIES_REQUEST});
        const data = await categoriesAPIs.getCategoriesService();
        dispatch({
            type: CategoriesConstants.GET_CATEGORIES_SUCCESS, 
            payload: data
        });
    } catch (error) {
        ErrorAction(error, dispatch ,CategoriesConstants.GET_CATEGORIES_FAIL);
    }
};

//create category action
export const createCategoryAction = (title) => async (dispatch,getState) => {
    try {
        dispatch({
            type: CategoriesConstants.CREATE_CATEGORY_REQUEST});
        await categoriesAPIs.createCategoryService(
            title, 
            tokenProtectApi(getState));
        dispatch({type: CategoriesConstants.CREATE_CATEGORY_SUCCESS});
        toast.success("Category created successfully");
    } catch (error) {
        ErrorAction(error, dispatch ,CategoriesConstants.CREATE_CATEGORY_FAIL);
    }
};

//update category action
export const updateCategoryAction = (id,title) => async (dispatch,getState) => {
    try {
        dispatch({
        type: CategoriesConstants.UPDATE_CATEGORY_REQUEST});
        await categoriesAPIs.updateCategoryService(
            id,
            title,
            tokenProtectApi(getState)
        );
        dispatch({type: CategoriesConstants.UPDATE_CATEGORY_SUCCESS});
        toast.success("Category updated successfully");
    } catch (error) {
        ErrorAction(error, dispatch ,CategoriesConstants.UPDATE_CATEGORY_FAIL);
    }
};

//delete category action
export const deleteCategoryAction = (id) => async (dispatch,getState) => {
    try {
        dispatch({type: CategoriesConstants.DELETE_CATEGORY_REQUEST});
        await categoriesAPIs.deleteCategoryService(id, tokenProtectApi(getState));
        dispatch({type: CategoriesConstants.DELETE_CATEGORY_SUCCESS});
        toast.success("Category deleted successfully");
    } catch (error) {
        ErrorAction(error, dispatch ,CategoriesConstants.DELETE_CATEGORY_FAIL);        
    }
};