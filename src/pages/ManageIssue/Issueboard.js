import React from "react";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";

const Issueboard = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>

        <div className="flex-1">
          <div className="rounded-lg p-2 ml-24">Đây là issue board </div>
        </div>
      </div>
    </>
  );
};

export default Issueboard;
