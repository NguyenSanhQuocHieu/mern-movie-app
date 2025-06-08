import React, { useEffect, useContext } from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMoviesAction, deleteFavoriteMovieAction, deleteSingleFavoriteMovieAction } from "../../Redux/Actions/userActions";
import {toast} from "react-toastify";
import Loader from "../../Components/Notfications/Loader";
import { Empty } from "../../Components/Notfications/Empty";
import { SidebarContext } from "../../Context/DrawerContext";
import FileSaver from "file-saver";
import { downloadVideo } from "../../Context/Functionalities";

function FavoritesMovies() {
  const dispatch = useDispatch();
  const {progress, setProgress} = useContext(SidebarContext);

  const {isLoading, isError, likedMovies} = useSelector(
    (state) => state.userGetFavoriteMovies
  );
  
  //delete all favorite movies
  const {
    isLoading: deleteLoading, 
    isError: deleteError,
    isSuccess: deleteSuccess 
  } = useSelector(
    (state) => state.userDeleteFavoriteMovie
  );

  //delete single favorite movie
  const {
    isLoading: deleteSingleLoading,
    isError: deleteSingleError,
    isSuccess: deleteSingleSuccess
  } = useSelector(
    (state) => state.userDeleteSingleFavoriteMovie
  );

  //delete all movies handler
  const deleteMovieHandler = () => {
    if (window.confirm("Are you sure you want to delete all movies?")) {
      dispatch(deleteFavoriteMovieAction());
    }
  };

  //delete single movie handler
  const deleteSingleMovieHandler = (movieId) => {
    if (window.confirm("Are you sure you want to remove this movie from favorites?")) {
      dispatch(deleteSingleFavoriteMovieAction(movieId));
    }
  };

  const DownloadMovieVideo = async (videoUrl, name) => {
    const blob = await downloadVideo(videoUrl, setProgress);
    if (blob) {
      FileSaver.saveAs(blob, `${name}.mp4`);
      setProgress(0);
    }
  };

  // Gọi API 1 lần khi load
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
  }, [dispatch]);

  // Xử lý lỗi nếu có
  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "GET_FAVORITE_MOVIES_RESET" });
    }
  }, [isError, dispatch]);

  // Xử lý lỗi và thành công khi delete
  useEffect(() => {
    if (deleteError || deleteSingleError) {
      toast.error(deleteError || deleteSingleError);
      dispatch({ type: "DELETE_FAVORITE_MOVIES_RESET" });
      dispatch({ type: "DELETE_SINGLE_FAVORITE_MOVIE_RESET" });
    }
    if (deleteSuccess || deleteSingleSuccess) {
      dispatch(getFavoriteMoviesAction()); // Refresh danh sách sau khi xóa thành công
      dispatch({ type: "DELETE_FAVORITE_MOVIES_RESET" });
      dispatch({ type: "DELETE_SINGLE_FAVORITE_MOVIE_RESET" });
    }
  }, [deleteError, deleteSingleError, deleteSuccess, deleteSingleSuccess, dispatch]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          {likedMovies && likedMovies.length > 0 && (
            <button 
              disabled={deleteLoading || deleteSingleLoading}
              onClick={deleteMovieHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded" 
            >
              {deleteLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading || deleteSingleLoading ? (
            <Loader/> 
        ) : likedMovies?.length > 0 ? (
              <Table 
                data={likedMovies} 
                admin={false} 
                downloadVideo={DownloadMovieVideo}
                progress={progress}
                onDeleteFavorite={deleteSingleMovieHandler}
              />
        ) : (
              <Empty message="You have no favorite movies" />
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;
