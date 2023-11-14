import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../libs/axios";
import useEmailStore from "../../store/mailStore";
const SendCodeToEmail = () => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { setVerifyCode, setName, setEmail } = useEmailStore();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const { email } = data;
      const response = await axios.post("/api/v1/users/send-email-code", data);
      setVerifyCode(response.data.data);
      useEmailStore.getState().setChangepassword(true);
      useEmailStore.getState().setRegister(false);
      setEmail(email);
      navigate("/verifymail");
    } catch (error) {
      console.error("Error registering:", error);
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
            Forgot password
          </p>
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Email
          </label>
          <input
            className="w-full py-2 px-4 mb-4 border rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            {...registerField("email", {
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
          {/* <label className="block text-gray-600 text-sm font-medium mb-2">
            Name
          </label>
          <input
            className="w-full py-2 px-4 mb-4 border rounded focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            {...registerField("name")}
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
            type="name"
            placeholder="Name"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )} */}
          <button
            className="w-full py-2 px-4 bg-gray-800 hover:bg-blue-500 text-white rounded cursor-pointer"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default SendCodeToEmail;
