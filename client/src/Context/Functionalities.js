import {toast} from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../Redux/Actions/userActions";
import { IoMdCloudDownload } from "react-icons/io";

// check if movie is added to favorite list
const IflikeMovie = (movie) => {
    const {likedMovies} = useSelector((state) => state.userGetFavoriteMovies);
    return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};

//like movie functionality
const likeMovie = (movie, dispatch,userInfo) => {
    return !userInfo 
    ? toast.error("Please login to like movie") 
    : dispatch(likeMovieAction({
        movieId: movie._id,
    })
);    
};

//dowload video movie
// download video movie from cloudinary
const downloadVideo = async (videoUrl, setProgress) => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
  
      // Không thể đo tiến trình với fetch trực tiếp, nên set 100 luôn
      setProgress(100);
      toast.success("Download complete!", {
        icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />,
      });
  
      return blob;
    } catch (error) {
      toast.error("Failed to download video");
      setProgress(0);
      return null;
    }
  };
  

export {IflikeMovie, likeMovie,downloadVideo};
