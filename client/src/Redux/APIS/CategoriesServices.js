import Axios from "./Axios";

// public api

//get all categories
const getCategoriesService = async () => {
    const {data} = await Axios.get("/categories");
    return data;
};

// admin api

//create new category
const createCategoryService = async (title,token) => {
    const {data} = await Axios.post("/categories", title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

//delete category
const deleteCategoryService = async (id,token) => {
    const {data} = await Axios.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};  

//update category
const updateCategoryService = async (id,title,token) => {
    const {data} = await Axios.put(`/categories/${id}`, title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

export {
    getCategoriesService,
    createCategoryService,
    deleteCategoryService,
    updateCategoryService,
}