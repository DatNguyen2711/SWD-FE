import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import ViewUserProfile from "../../pages/ManageUsers/ViewUserProfile";
import BlockUnblockUser from "../../pages/ManageUsers/BlockUnblockUser";

const PopoverButton = ({ selectedId, userStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <Button onClick={handleClick} variant="text" sx={{ padding: "0" }}>
        <MoreVertIcon />
      </Button>
      <Popover
        style={{ width: "270px", borderRadius: "40px" }} 
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container direction="column" spacing={1}>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <ViewUserProfile selectedId={selectedId} />
          </Grid>
          {userStatus ? (
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <BlockUnblockUser
                selectedId={selectedId}
                userStatus={userStatus}
              />
            </Grid>
          ) : (
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <BlockUnblockUser
                selectedId={selectedId}
                userStatus={userStatus}
              />
            </Grid>
          )}
        </Grid>
      </Popover>
    </div>
  );
};

export default PopoverButton;
