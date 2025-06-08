import React, { useEffect } from "react";  
import { Input } from "../../Components/UsedInputs";  
import SideBar from "./SideBar";  
import { useDispatch, useSelector } from "react-redux";
import { PasswordValidation } from "../../Components/Validation/UserValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../Components/Notfications/Error";
import { changePasswordAction } from "../../Redux/Actions/userActions";
import { toast } from "react-toastify";

function Password() {
  const dispatch = useDispatch();
  const {isLoading, isError,message,isSuccess} = useSelector(
    (state) => state.userChangePassword
  );

  //validation
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(PasswordValidation),
  });

    //change password onSubmit
    const onSubmit = (data) => {
      const {oldPassword,newPassword,confirmPassword} = data;
      dispatch(changePasswordAction({oldPassword,newPassword,confirmPassword}));
    }

  //useEffect
  useEffect(() => {
    if(isSuccess) {
      dispatch({type: "USER-CHANGE-PASSWORD-RESET"});
    }
    if(isError) {
      toast.error(isError);
      dispatch({type: "USER_CHANGE_PASSWORD_RESET"});
    }
    if(message) {
      toast.success(message);
      reset();
    }
  }, [isSuccess,isError,message,reset,dispatch]);



  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <div className="w-full"> 
          <Input
            label="Previous Password"
            placeholder="********"
            type="password"
            bg={true}
            name="oldPassword"
            register={register("oldPassword")}
          />
          {errors.oldPassword && (<InlineError text={errors.oldPassword.message} />)}
          </div>

          <div className="w-full"> 
          <Input
            label="New Password"
            placeholder="********"
            type="password"
            bg={true}
            name="newPassword"
            register={register("newPassword")}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
            )}
          </div>
          <div className="w-full"> 
          <Input
            label="Confirm Password"
            placeholder="********"
            type="password"
            bg={true}
            name="confirmPassword"
            register={register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
            )}
          </div>
        
        <div className="flex justify-end items-center my-4">
          <button 
          disabled={isLoading}
          type="submit"
          className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
          >
            {isLoading ? "Chaing..." : "Change Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Password;
