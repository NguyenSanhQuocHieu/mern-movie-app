import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImageservice = async (file,setLoading) => {
  try {
    setLoading(true);
    const {data} = await Axios.post("/upload",file);
    setLoading(false);
    toast.success("Image uploaded successfully");
    return data; 
  } catch (error) {
    setLoading(false);
    toast.error("Image upload failed");
  }
};

export {uploadImageservice};