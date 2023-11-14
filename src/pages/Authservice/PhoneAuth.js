import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import CustomLinearProgress from "../../components/common/LinearProgress";
const PhoneAuth = () => {
  const [otp, setOtp] = useState("");
  const [showLinearProgress, setShowLinearProgress] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setShowLinearProgress(true);

    setTimeout(() => {
      setShowLinearProgress(false);
    }, 2000);
  };


  return (
    <section className="bg-ct-blue-600 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full mx-auto p-6 bg-white shadow-100 rounded-2xl">
        {" "}
        <img
          className="w-auto h-7 sm:h-8 mb-6 mx-auto"
          src="https://merakiui.com/images/logo.svg"
          alt=""
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-light text-center text-black-600 mb-4">
            We sent an OTP code to your phone please check !
          </h3>
          <p className="text-sm font-light text-gray-600 text-center mb-6">
            Enter the code
          </p>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
            inputStyle={{
              width: "35px",
              height: "40px",
              fontSize: "16px",
              textAlign: "center",
              border: "2px solid gray",
              borderRadius: "5px",
              marginRight: "10px",
              outline: "none", // Loại bỏ viền khi focus
              transition: "border-color 0.2s", // Hiệu ứng chuyển đổi màu viền
            }}
            renderInput={(props) => <input {...props} />}
          />

          <button
            className="w-full mt-6 py-2 px-4 bg-gray-800 text-white rounded cursor-pointer mb-4"
            type="submit"
          >
            Verify
          </button>
          <div className="text-center">
            <Link className="text-blue-600 no-underline text-sm border-b border-blue-600 hover:text-blue-800 hover:border-blue-800">
              Resend code
            </Link>
          </div>

          {showLinearProgress && <CustomLinearProgress />}
        </form>
      </div>
    </section>
  );
};

export default PhoneAuth;
