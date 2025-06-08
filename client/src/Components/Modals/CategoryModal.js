import React, { useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createCategoryAction, updateCategoryAction } from "../../Redux/Actions/CategoriesActions";
import { useEffect } from "react";
import * as CategoriesConstants from "../../Redux/Constants/CategoriesConstants";

function CategoryModal({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.categoryCreate
  );

  const { 
    isLoading: uploading, 
    sError: upError, 
    isSuccess: upSuccess 
  } = useSelector(
    (state) => state.categoryUpdate
  );

  // category handle
  const submitHandler = (e) => {
    e.preventDefault();
    if (title) {
      // Check if title is empty or contains only whitespace
      if (title.trim() === '') {
        toast.error("Category name cannot be empty");
        return;
      }
      
      if (category) {
        // Update category
        dispatch(updateCategoryAction(category._id, { title: title }));
      } else {
        // Create category
        dispatch(createCategoryAction({ title: title }));
      }
    } else {
      toast.error("Please write a category name");
    }
  };

  useEffect(() => {
    // Handle errors
    if (upError || isError) {
      // Check for duplicate category error
      if (upError?.includes("already exists") || isError?.includes("already exists")) {
        toast.error("Category already exists");
      } else {
        toast.error(upError || isError);
      }
      dispatch({
        type: isError ? CategoriesConstants.CREATE_CATEGORY_RESET : CategoriesConstants.UPDATE_CATEGORY_RESET
      });
    }

    // Handle success
    if (isSuccess) {
      toast.success("Category created successfully");
      setTitle("");
      setModalOpen(false);
      dispatch({ type: CategoriesConstants.CREATE_CATEGORY_RESET });
    }

    if (upSuccess) {
      toast.success("Category updated successfully");
      setModalOpen(false);
      dispatch({ type: CategoriesConstants.UPDATE_CATEGORY_RESET });
    }

    // Set title if editing
    if (category) {
      setTitle(category?.title);
    }

    // Reset form when modal closes
    if (modalOpen === false) {
      setTitle("");
    }
  }, [isError, isSuccess, upSuccess, upError, category, modalOpen, dispatch, setModalOpen]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="relative inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <button
          onClick={() => setModalOpen(false)}
          type="button"
          className="absolute right-5 top-5 transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white z-50"
        >
          <span className="sr-only">Close</span>
          &times;
        </button>
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form
          className="flex flex-col gap-6 text-left mt-6"
          onSubmit={submitHandler}
        >
          <Input
            label="Category Name"
            placeholder={"Actions"}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            disabled={isLoading || uploading}
            type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {isLoading || uploading
              ? "Loading..."
              : category
              ? "Update"
              : "Create"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CategoryModal;
