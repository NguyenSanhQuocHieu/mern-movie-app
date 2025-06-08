import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { InlineError } from "../../Components/Notfications/Error";
import { ImagePreview } from "../../Components/Imagepreview";
import { useState } from "react";
import { updateProfileAction, deleteProfileAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";

function Profile() {
  const dispatch = useDispatch();
  const {userInfo,} = useSelector((state) => state.userLogin);  
  const [imageUrl,setImageUrl] = useState(userInfo ? userInfo.image : "/images/user.png");
  const {isLoading, isError,isSuccess} = useSelector(
    (state) => state.userUpdateProfile
  ); 
  const {isLoading: deleteLoading, isError: deleteError} = useSelector(
    (state) => state.userDeleteProfile
  ); 
  
//validation user
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  })

//update profile onSubmit
  const onSubmit = (data) => {
    dispatch(updateProfileAction({...data,image:imageUrl}));
  };

//delete profile onSubmit
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your account?") 
    && dispatch(deleteProfileAction());
  };

// useEffect
  useEffect(() => {
    if(userInfo) {
        setValue("fullName", userInfo.fullName);
        setValue("email", userInfo.email);
    }
    if(isSuccess) {
      dispatch({type: "USER-UPDATE-PROFILE-RESET"});
    }
    if(isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({type: "USER_UPDATE_PROFILE_RESET"});
      dispatch({type: "USER_DELETE_PROFILE_RESET"});
    }
  }, [userInfo,setValue,isSuccess,isError,dispatch,deleteError]);
  
  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-2 gap-6">
          <div className="col-span-10">
            <Uploder setImageUrl={setImageUrl}/>
          </div>
          {/* image preview*/}
          <div className="col-span-2">
            <ImagePreview 
              image={imageUrl}
              name={userInfo ? userInfo.fullName : "Netflix React Tailwind"}
            />
          </div>
                
          <div className="w-full"> 
            <Input
            label="FullName"
            placeholder="Netflix React Tailwind"
            type="text"
            name="fullName"
            register={register("fullName")}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
          </div>
          <div className="w-full"> 
          <Input
            label="Email"
            placeholder="nguyensanhquochieu2003@gmail.com"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button 
          onClick={deleteProfile}  
          disabled={deleteLoading || isLoading}
          className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
          {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button 
          disabled={deleteLoading || isLoading}
          className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
           {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
