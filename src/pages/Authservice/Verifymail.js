import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

const Verifymail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    navigate("/verifymail");
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

          <TextField
            fullWidth
            label="Enter your email"
            id="fullWidth"
            {...register("code")}
          />
          <button
            className="w-full mt-6 py-2 px-4 bg-gray-800 text-white rounded cursor-pointer mb-4"
            type="submit"
          >
            Send Code
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Verifymail;
