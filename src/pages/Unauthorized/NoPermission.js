import React from "react";
import { Link } from "react-router-dom";

const NoPermission = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-screen flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">401 - Unauthorized</h1>
          <p className="text-xl mb-8">
            Oops! You don't have permission to access this page.
          </p>
          <Link
            to="/"
            className="bg-white text-indigo-600 hover:bg-indigo-300 px-6 py-3 rounded-full font-semibold transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NoPermission;
