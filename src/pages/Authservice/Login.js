import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import useAuthStore from "../../store/auth";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const setLogin = useAuthStore((state) => state.setLogin);
  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response === "Your account is locked !") {
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
      } else {
        const initialState = {
          token: response.token,
          isAuth: true,
          user: {
            id: response.user.id,
            email: response.user.email,
            picture: response.user?.picture,
            name: response.user.name,
            emailVerified: response.user.emailVerified,
            roleId: response.roleId,
          },
          role: response.role,
        };
        console.log(initialState.role);
        setLogin(initialState);
        if (initialState.role === "ADMIN") {
          navigate("/dashboard");
        } else if (initialState.role === "STUDENT") {
          navigate("/issue");
        } else if (initialState.role === "MANAGER") {
          navigate("/project");
        } else if (initialState.role === "TEACHER") {
          navigate("/class");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Wrong password or username !", {
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
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-100 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8 mb-2"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>{" "}
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">
            Welcome Back
          </h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Email
          </label>
          <input
            className="w-full py-2 px-4 mb-4 border rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>
          <input
            className="w-full py-2 px-4 mb-4 border rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            {...register("password")}
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
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="mt-2 mb-4">
            <a className="text-sm mb-2">
              <Link
                to="/sendcodetoemail"
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </a>
          </div>
          <button
            className="w-full py-2 px-4 bg-gray-800 hover:bg-blue-500 text-white rounded cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a className="text-sm mb-2">
            You don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </a>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
          <a className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
            or login with Social Media
          </a>
          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>
        <div className="flex items-center mt-6 -mx-2">
          <button
            type="button"
            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
          >
            <span className="hidden mx-2 sm:inline">Sign in with Google</span>
            <GoogleAuth sx={{ width: "123px" }} />
          </button>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;