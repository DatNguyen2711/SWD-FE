import React from "react";

const ForgotPasswordChoice = () => {
  return (
    <div>
      <section className="bg-ct-blue-600 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-md w-full mx-auto p-6 bg-white shadow-100 rounded-2xl">
          <img
            className="w-auto h-7 sm:h-8 mb-6 mx-auto"
            src="https://merakiui.com/images/logo.svg"
            alt=""
          />
          <form>
            <h3 className="text-xl font-light text-center text-black-600 mb-4">
              Verify it's You
            </h3>
            <p className="text-sm font-light text-gray-600 text-center mb-6">
              Choose your verification ways
            </p>
            <div className="bg-gray-200 w-90 rounded-lg h-16 mb-4 border-l-8 border-blue-600"></div>

            <div className="bg-gray-200 w-90 rounded-lg h-16 mb-4 border-l-8 border-green-600"></div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPasswordChoice;
