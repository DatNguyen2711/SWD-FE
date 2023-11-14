import { Button } from "@mui/material";
import React from "react";
import BlockIcon from "@mui/icons-material/Block";
import UnblockIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { useState } from "react";
import authApi from "../../libs/axios";
const BlockUnblockUser = ({ selectedId, userStatus }) => {
  const [status, setStatus] = useState(userStatus);

  const changeUserStatus = async () => {
    await authApi.put(`/api/v1/users/change-active/${selectedId}`);
    setStatus(!status);
  };
  return (
    <div className="w-32">
      <Button
        onClick={changeUserStatus}
        variant="text"
        sx={{ color: "#1677ff", marginLeft: "12px" }}
      >
        {status ? (
          <BlockIcon style={{ color: "red" }} />
        ) : (
          <UnblockIcon style={{ color: "green" }} />
        )}

        {status ? (
          <Link
            className="mb-0 text-black ml-5"
            style={{
              textTransform: "none",
              fontFamily: "Public Sans, sans-serif",
            }}
          >
            Block
          </Link>
        ) : (
          <Link
            className="mb-0 text-black ml-5"
            style={{
              textTransform: "none",
              fontFamily: "Public Sans, sans-serif",
            }}
          >
            Unblock
          </Link>
        )}
      </Button>
    </div>
  );
};

export default BlockUnblockUser;
