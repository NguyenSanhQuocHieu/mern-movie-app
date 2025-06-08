import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction, deleteCategoryAction } from "../../../Redux/Actions/CategoriesActions";
import Loader from "../../../Components/Notfications/Loader";
import { Empty } from "../../../Components/Notfications/Empty";
import { toast } from "react-hot-toast";
import * as CategoriesConstants from "../../../Redux/Constants/CategoriesConstants";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  // all categories
  const { categories, isLoading } = useSelector(
    (state) => state.categoryGetAll
  );

  // delete category
  const { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError } = useSelector(
    (state) => state.categoryDelete
  );

  // create and update states
  const { isSuccess: createSuccess } = useSelector(
    (state) => state.categoryCreate
  );
  const { isSuccess: updateSuccess } = useSelector(
    (state) => state.categoryUpdate
  );

  const adminDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  // Effect for handling delete success and error
  useEffect(() => {
    dispatch(getAllCategoriesAction());
    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: CategoriesConstants.DELETE_CATEGORY_RESET });
    }
    if (deleteSuccess) {
      toast.success("Category deleted successfully");
      dispatch({ type: CategoriesConstants.DELETE_CATEGORY_RESET });
      // Refresh the categories list after successful deletion
      dispatch(getAllCategoriesAction());
    }
  }, [deleteError, deleteSuccess, dispatch]);

  // Effect for handling create/update success and general list refresh
  useEffect(() => {
    dispatch(getAllCategoriesAction());

    if (createSuccess || updateSuccess) {
      dispatch(getAllCategoriesAction());
    }

    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, createSuccess, updateSuccess]);

  return (
    <SideBar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>

        {isLoading || deleteLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={adminDeleteCategory}
          />
        ) : (
          <Empty message="You have no categories" />
        )}
      </div>
    </SideBar>
  );
}

export default Categories;

