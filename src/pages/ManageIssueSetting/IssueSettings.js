import React, { useEffect, useState } from "react";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { DataGrid } from "@mui/x-data-grid";
import useQueryissueTypes from "../../hooks/useQueryissueTypes";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Check, DoNotDisturb, Edit } from "@mui/icons-material";
import axios from "../../libs/axios";
import IssueSettingModal from "./IssueSettingModal";

const IssueSettings = () => {
  const [issueSettingData, setIssueSettingData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = (id) => {
    setIssueSetting({ ...issueSetting, id: id });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIssueSetting({ ...issueSetting, id: null });
    setOpenDialog(false);
  };
  const [issueSetting, setIssueSetting] = useState({
    id: null,
    name: "",
    description: "",
    type: "",
    projectId: -1,
    classId: -1,
    subjectId: -1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIssueSetting({
      id: null,
      name: "",
      description: "",
      type: "",
      classId: -1,
      subjectId: -1,
      projectId: -1,
    });
  };

  const handleEditClick = (id) => {
    axios.get(`/api/v1/issue-types/get-detail/${id}`, {}).then((response) => {
      var res = response.data.data;
      setIssueSetting({
        id: res?.id,
        name: res?.name == null ? "" : res?.name,
        description: res?.description == null ? "" : res?.description,
        type: res?.type == null ? "No Selection" : res?.type,
        projectId: res?.project?.id == null ? -1 : res?.project?.id,
        classId: res?._class?.id == null ? -1 : res?._class?.id,
        subjectId: res?.subject?.id == null ? -1 : res?.subject?.id,
      });
      handleOpen();
});
  };

  const handleDelete = () => {
    console.log(issueSetting?.id);
    axios
      .put(`/api/v1/issue-types/change-active/${issueSetting?.id}`, {})
      .then((response) => {
        console.log(response);
        const updatedItem = response.data.data;
        const updatedList = issueSettingData.map((item) => {
          if (item.id === updatedItem.id) {
            return updatedItem;
          }
          return item;
        });
        setIssueSettingData(updatedList);
        handleCloseDialog();
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "active",
      headerName: "Status",
      type: "boolean",
      width: 100,
    },
    {
      field: "project",
      headerName: "Project",
      type: "text",
      width: 150,
      valueGetter: (params) => params.row.project?.name || "N/A",
    },
    {
      field: "subject",
      headerName: "Subject",
      type: "text",
      width: 150,
      valueGetter: (params) => params.row.subject?.name || "N/A",
    },
    {
      field: "_class",
      headerName: "Class",
      type: "text",
      width: 150,
      valueGetter: (params) => params.row._class?.name || "N/A",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            startIcon={<Edit style={{ marginLeft: "15px" }} />}
            style={{ marginRight: "5px" }}
            onClick={() => handleEditClick(params.row.id)}
          />
          <Button
            variant="outlined"
            startIcon={
              params.row.active ? (
                <DoNotDisturb style={{ marginLeft: "15px" }} />
              ) : (
                <Check style={{marginLeft:"15px"}}/>
              )
            }
            onClick={() => handleClickOpenDialog(params.row.id)}
          />
        </div>
      ),
    },
  ];

  const {
    issuesTypes: issueSettings,
    pageIndexResponse,
    pageSizeResponse,
    totalrecords,
  } = useQueryissueTypes({
    pageIndex: pageIndex,
    pageSize: pageSize,
  });
  useEffect(() => {
    setIssueSettingData(issueSettings);
  }, [pageSize, issueSettings, pageIndex]);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <IssueSettingModal
        issueSetting={issueSetting}
        setIssueSetting={setIssueSetting}
        open={open}
        handleClose={handleClose}
        issueSettingData={issueSettingData}
        setIssueSettingData={setIssueSettingData}
      />
      <NavBar />
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-1 mt-3">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold ml-4">Issue Settings</h2>
            <div className="mr-36">
              <Button
                onClick={handleOpen}
                variant="contained"
                startIcon={<Add />}
                style={{
                  height: "50px",
                  width: "140px",
                  marginLeft: "820px",
                }}
              >
                Add New
              </Button>
            </div>
          </div>

          <div
            style={{
              width: "90%",
              height: "400px",
              marginLeft: "40px",
              marginTop: "40px",
            }}
          >
            <DataGrid
              rows={issueSettingData}
              columns={columns}
              rowCount={totalrecords}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 25]}
              onPaginationModelChange={(e) => {
                setPageIndex(e.page);
                setPageSize(e.pageSize);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueSettings;
