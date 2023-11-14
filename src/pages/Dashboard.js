import React from "react";
import NavBar from "./../components/common/NavBar";
import ManageUser from "../pages/ManageUsers/ManageUser";
import SideBar from "../components/common/SideBar";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="w-64">
          <SideBar />
        </div>

        <div className="flex-1">
          <div className="rounded-lg p-2 ml-24">
            <ManageUser />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
