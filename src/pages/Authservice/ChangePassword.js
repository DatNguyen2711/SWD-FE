import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../libs/axios";
import useAuthStore from "../../store/auth";
const ChangePassword = () => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const uid = user.id;
  const onSubmit = async (data) => {
    try {
      const { oldPassword, newPassword } = data;
      const response = await axios.put(`/api/v1/users/change-password/${uid}`, {
        oldPassword,
        newPassword,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <section className="bg-ct-blue-600 min-h-screen flex flex-col ">
      <div className="w-[480px] mx-auto  p-6 bg-white shadow-100 rounded-2xl shadow-2xl mt-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8 mb-2"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>{" "}
          <h3 class="mt-3 text-xl font-medium text-center text-gray-600 ">
            Welcome Back
          </h3>
          <p class="mt-1 text-center text-gray-500 dark:text-gray-400">
            Reset password
          </p>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Old Password
            </label>
            <input
              {...registerField("oldPassword", {
                required: "Password is required",
              })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Old Password"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              New Password
            </label>
            <input
              {...registerField("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="New Password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <button
            className="w-full py-2 px-4 bg-gray-800 hover:bg-blue-500 text-white rounded cursor-pointer"
            type="submit"
          >
            Reset password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
