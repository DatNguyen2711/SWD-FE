import React from "react";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "../../libs/axios";
import { Link, useParams } from "react-router-dom";
import useUserStore from "../../store/user";
const ViewUserProfile = ({ selectedId }) => {
  const { id = selectedId } = useParams();
  const { setUserData } = useUserStore();

  const viewUserProfile = async () => {
    const response = await axios.get(`api/v1/users/get-detail/${id}`);
    setUserData(response.data.data);
  };

  return (
    <div className="w-32">
      <Button
        onClick={viewUserProfile}
        variant="text"
        sx={{ color: "#1677ff", marginLeft: "12px" }}
      >
        <VisibilityIcon style={{ color: "#1677FF" }} />

        <Link
          to={`/dashboard/${id}`}
          className="mb-0 text-black ml-5"
          style={{
            textTransform: "none",
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          View
        </Link>
      </Button>
    </div>
  );
};

export default ViewUserProfile;