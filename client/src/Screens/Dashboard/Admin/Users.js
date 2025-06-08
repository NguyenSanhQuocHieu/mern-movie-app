import React, { useEffect, useState } from "react";
import Table2 from "../../../Components/Table2";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction, deleteUserAction } from "../../../Redux/Actions/userActions";
import { toast } from "react-toastify";
import Loader from "../../../Components/Notfications/Loader";
import { Empty } from "../../../Components/Notfications/Empty";
import { FaSearch } from "react-icons/fa";

function Users() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const {isLoading ,isError,users} = useSelector(
    (state) => state.adminGetAllUsers
  );
  //delete 
  const {
    isError: deleteError,
    isSuccess } = useSelector(
    (state) => state.adminDeleteUser 
  );
  
  //delete user handler
  const deleteMovieHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(id));
    }
  };
  
  // Filter users based on search
  const filteredUsers = users?.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );
  
  // Gọi API 1 lần khi load
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);
  
  // Xử lý lỗi nếu có
  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "GET_ALL_USERS_RESET" });
    }
  }, [isError, dispatch]);
  
  // Xử lý lỗi và thành công khi delete
  useEffect(() => {
    if (isSuccess) {
      dispatch(getAllUsersAction());
      dispatch({ type: "DELETE_USER_RESET" });
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch({ type: "DELETE_USER_RESET" });
    }
  }, [dispatch, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Users</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search user by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-border bg-main text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:border-subMain"
              />
              <FaSearch className="absolute right-4 top-3 text-subMain" />
            </div>
          </div>
        </div>
        {isLoading ? (
            <Loader/> 
        ) : filteredUsers?.length > 0 ? (
          <Table2 
          data={filteredUsers} 
          users={true} 
          onDeleteFunction={deleteMovieHandler} />
        ) : (
          <Empty message="No users found" />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
