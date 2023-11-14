import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../libs/axios";
import useEmailStore from "../../store/mailStore";
const ForgotPassword = () => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { email } = useEmailStore();
  const onSubmit = async (data) => {
    try {
      const { password } = data;
      const response = axios.put(
        "api/v1/users/forgot-password/change-password",
        { email, password }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error logging in:", error);
    }
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
          <p class="mt-1 text-center text-gray-500 dark:text-gray-400">
            Enter your new password
          </p>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>

          <input
            className="w-full py-2 px-4 mb-4 border rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            {...registerField("password")}
            // {...register("password", {
            //   required: "Password is required",
            //   validate: (value) => {
            //     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            //     if (regex.test(value)) {
            //       return true;
            //     }
            //     return "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long";
            //   },
            // })}
            type="password"
            placeholder="New Password"
          />

          <button
            className="w-full py-2 px-4 bg-gray-800 hover:bg-blue-500 text-white rounded cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
