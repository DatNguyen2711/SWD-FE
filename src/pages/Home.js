import React from "react";
import NavBar from "../components/common/NavBar";
import useAuthStore from "../store/auth";
const Home = () => {
  const isAuth = useAuthStore(({ isAuth }) => isAuth);
  const namestore = useAuthStore(({ user }) => user.name);

  return (
    <div>
      <NavBar />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <p className="text-3xl font-semibold text-center">
            {isAuth ? `Welcome back ${namestore} !` : "No sign in"}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
