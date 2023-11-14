import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { register } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../libs/axios";
import useEmailStore from "../../store/mailStore";
import CustomLinearProgress from "../../components/common/LinearProgress";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");
  const { setVerifyCode, setName, setEmail } = useEmailStore();
  const [showLinearProgress, setShowLinearProgress] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const { email, name, password, phoneNumber, roleId = 1 } = data;
      const response = await register({
        email,
        phoneNumber,
        name,
        password,
        roleId,
      });
      if (response === "Email domain is incorrect!") {
        toast.error(response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else if (response === "Email is already existed!") {
        toast.error(response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else if (response === "Length of password must be >= 6!") {
        toast.error(response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else {
        useEmailStore.getState().setChangepassword(false);
        useEmailStore.getState().setRegister(true);
        setShowLinearProgress(true);

        const response_verify = await axios.post(
          "/api/v1/users/send-email-code/register",
          {
            email,
            name,
          }
        );
        setEmail(email);
        setName(name);
        setVerifyCode(response_verify.data.data);
        navigate("/verifymail");
      }

    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-md mx-auto my-2 bg-white p-5 rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="flex justify-center">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>
          <h4 className="text-2xl text-center font-normal text-gray-700 mt-5">
            Register your account
          </h4>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              {...registerField("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Phone number
            </label>
            <input
              {...registerField("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Name
            </label>
            <input
              {...registerField("name", {
                required: "Name is required",
              })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              {...registerField("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              {...registerField("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
          >
            Sign Up
          </button>
          {showLinearProgress && (
            <CustomLinearProgress style={{ marginTop: "10px" }} />
          )}

          <div className="mt-4 text-center">
            <p className="text-sm mb-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;