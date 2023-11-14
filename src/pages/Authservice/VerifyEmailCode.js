import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import useEmailStore from "../../store/mailStore";
import axios from "../../libs/axios";

const VerifyEmailCode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const {
    data: verifyCode,
    name,
    email,
    setVerifyCode,
    changepassword,
    register: registercode,
  } = useEmailStore();
  const onSubmit = async (data) => {
    try {
      if (data.code === verifyCode) {
        if (changepassword === true && registercode === false) {
          navigate("/forgotpassword");
        } else {
          navigate("/login");
        }
      } else {
        toast.error("Wrong code. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-custom",
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const resendcode = () => {
    setVerifyCode(null);
    const response_verify = axios.post(
      "/api/v1/users/send-email-code/register",
      {
        email,
        name,
      }
    );
    setVerifyCode(response_verify.data.data);
  };
  return (
    <section className="bg-ct-blue-600 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto p-6 bg-white shadow-100 rounded-2xl">
        <img
          className="w-auto h-7 sm:h-8 mb-6 mx-auto"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-light text-center text-black-600 mb-4">
            Verify your email address
          </h3>
          <p className="text-sm font-light text-gray-600 text-center mb-6">
            Enter the code we sent to datlaid@gmail.com. If you don't see it,
            check your spam folder.
          </p>

          <TextField
            fullWidth
            label="Enter 6-digit code"
            id="fullWidth"
            {...register("code")}
          />
          <button
            className="w-full mt-6 py-2 px-4 bg-gray-800 text-white rounded cursor-pointer mb-4"
            type="submit"
          >
            Verify
          </button>
        </form>
        <div onClick={resendcode} className="text-center">
          <NavLink className="text-blue-600 text-sm border-b border-blue-600 hover:text-blue-800 hover:border-blue-800">
            Resend code
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default VerifyEmailCode;
