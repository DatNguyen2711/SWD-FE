import { Avatar, Input, Button, Upload, Typography, Select } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";
import NavBar from "../components/common/NavBar";
import SideBar from "../components/common/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../libs/axios";
const { Option } = Select;

const Editprofile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleUpload = (info) => {
    if (info.file.status === "done") {
      console.log("File uploaded successfully");
    } else if (info.file.status === "error") {
      console.error("File upload failed.");
    }
  };

  const handleCook = () => {
    navigate("/dashboard");
  };
  const saveChanges = () => {
    axios.post(`api/v1/users/update/${id}`);
  };
  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="w-64">
          <SideBar />
        </div>

        <div className="flex-1 p-4 ml-4">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

          <div className="flex items-center mb-4">
            <Avatar size={130} icon={<UserOutlined />} />

            <div className="ml-4">
              <Upload showUploadList={false} customRequest={handleUpload}>
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </div>
          </div>

          <Typography.Title level={5} className="mb-2">
            Full Name
          </Typography.Title>
          <Input placeholder="Enter your full name" style={{ maxWidth: 300 }} />

          <div className="mt-4">
            <Button
              onclick={saveChanges}
              style={{ backgroundColor: "#1677FF", color: "white" }}
              type="primary"
            >
              Save Changes
            </Button>
            <Button
              onclick={handleCook}
              type="text"
              style={{ backgroundColor: "red", color: "white" }}
              className="ml-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editprofile;
