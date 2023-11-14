import React, { useEffect, useState } from "react";
import axios from "../../libs/axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { Button, DatePicker, Input, Select, Typography, message } from "antd";
import dayjs from "dayjs";
import useQueryUser from "../../hooks/useQueryUser";
import { gridDensityValueSelector } from "@mui/x-data-grid";
import { ClearOutlined } from "@ant-design/icons";
import useQueryissueTypes from "../../hooks/useQueryissueTypes";
import useQueryMilestone from "../../hooks/useQueryMilestone";
import { toast } from "react-toastify";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
const { Option } = Select;
const { Title, Text } = Typography;

const IssueDetail = () => {
  const { id } = useParams();
  const [issueDetail, setIssueDetail] = useState({});

  const [assigneeName, setAssigneeName] = useState();
  const [assigneeId, setAssigneeId] = useState();
  const [issueTitle, setIssuetitle] = useState();
  const [issueDuedate, setIssueDuedate] = useState();
  const [issueDescription, setIssueDescription] = useState();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [btnEditText, setBtnEditText] = useState("Edit");
  const [status, setStatus] = useState({ id: null, name: null });
  const [process, setProcess] = useState({ id: null, name: null });
  const [type, setType] = useState({ id: null, name: null });
  const [milestone, setMilestone] = useState({ id: null, title: null });
  const [projectId, setProjectId] = useState();
  const [assignees, setAssignees] = useState([]);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [message, setMessage] = useState("Update Successfully!");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsShowMessage(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    const fetchIssueDetail = async () => {
      const response = await axios.get(`/api/v1/issues/get-detail/${id}`);
      if (response.data.statusCode !== 200) {
        // setMessage("Issue Not Found!");
        // setSeverity("error");
        // setIsShowMessage(true);
        navigate("/issue");
        return;
      }
      setIssueDetail(response.data.data);
      setAssigneeName(response.data.data.assignee?.name);
      setAssigneeId(response.data.data.assignee?.id);
      setIssuetitle(response.data.data.title);
      setIssueDuedate(response.data.data.dueDate);
      setIssueDescription(response.data.data.description);

      setStatus((status) => ({
        ...status,
        id: response.data.data.issueStatus?.id,
        name: response.data.data.issueStatus?.name,
      }));
      setType((type) => ({
        ...type,
        id: response.data.data.issueType?.id,
        name: response.data.data.issueType?.name,
      }));
      setProcess((process) => ({
        ...process,
        id: response.data.data.process?.id,
        name: response.data.data.process?.name,
      }));
      setMilestone((milestone) => ({
        ...milestone,
        id: response.data.data.milestone?.id,
        title: response.data.data.milestone?.title,
      }));
      setProjectId(response.data.data.project?.id);
    };
    fetchIssueDetail();
  }, [id]);
  const handleChange = (e) => {
    setIssuetitle(e.target.value);
  };
  const handleAssigneeChange = (e) => {
    if (!isReadOnly) {
      setAssigneeId(e);
      const selectedAssignee = assignees.find((assignee) => assignee.id === e);

      if (selectedAssignee) {
        setAssigneeName(selectedAssignee.name);
      }
    }
  };

  const { issuesTypes } = useQueryissueTypes({
    pageSize: 9999,
    type: "Issue Type",
  });
  const { issuesTypes: issuesStatus } = useQueryissueTypes({
    pageSize: 9999,
    type: "Issue Status",
  });
  const { issuesTypes: processes } = useQueryissueTypes({
    pageSize: 9999,
    type: "Process",
  });
  const { milestones } = useQueryMilestone({
    pageSize: 9999,
  });
  useEffect(() => {
    axios.get("/api/v1/users/get-all").then((response) => {
      setAssignees(response.data.data);
    });
  }, []);

  const handleTypeChange = (e) => {
    const updateType = { ...type };
    updateType.id = e;
    const selectedTypeName = issuesTypes.find((type) => type.id === e);
    if (selectedTypeName) updateType.name = selectedTypeName.name;

    setType(updateType);
  };

  const handleStatusChange = (e) => {
    const updateStatus = { ...status };
    updateStatus.id = e;
    const selectedStatusName = issuesStatus.find((status) => status.id === e);

    if (selectedStatusName) updateStatus.name = selectedStatusName.name;

    setStatus(updateStatus);
  };

  const handleProcessChange = (e) => {
    const updateProcess = { ...process };
    updateProcess.id = e;
    const selectedProcessName = processes.find((process) => process.id === e);

    if (selectedProcessName) updateProcess.name = selectedProcessName.name;

    setProcess(updateProcess);
  };
  const handleMilestoneChange = (e) => {
    const updateMilestone = { ...milestone };
    updateMilestone.id = e;
    const selectedMilestoneTitle = milestones.find(
      (milestone) => milestone.id === e
    );

    if (selectedMilestoneTitle)
      updateMilestone.title = selectedMilestoneTitle.title;

    setMilestone(updateMilestone);
  };

  const handleEdit = () => {
    if (btnEditText === "Edit") {
      setIsReadOnly(false);
      setBtnEditText("Save");
    } else {
      if (issueTitle === null || issueTitle === "") {
        setSeverity("error");
        setMessage("Title is required!");
        setIsShowMessage(true);
        return;
      }
      axios
        .put(`/api/v1/issues/update/${issueDetail.id}`, {
          id: issueDetail.id,
          title: issueTitle,
          assigneeId: assigneeId,
          dueDate:
            issueDuedate === null
              ? null
              : dayjs(issueDuedate).format("YYYY-MM-DD"),
          description: issueDescription,
          projectId: projectId ?? null,
          issueTypeId: type?.id ?? null,
          issueStatusId: status?.id ?? null,
          processId: process?.id ?? null,
          milestoneId: milestone?.id ?? null,
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            setBtnEditText("Edit");
            setIsReadOnly(true);
            setMessage("Update Successfully!");
            setSeverity("success");
            setIsShowMessage(true);
          } else {
            setSeverity("error");
            setMessage(response.data.data);
            setIsShowMessage(true);
          }
        });
    }
  };

  const handleDelete = () => {
    console.log(id);
    axios.delete(`/api/v1/issues/delete/${id}`).then((response) => {
      window.location.href = "/issue";
      handleCloseDialog();
    });
  };

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
            Do you want to delete this issue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isShowMessage}
        onClose={handleClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <NavBar />
      <div style={{ display: "flex" }}>
        <div style={{ flex: "0 0 64px" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1, marginTop: "20px", marginLeft: "10px" }}>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 auto" }}>
              <Title level={2} style={{ marginBottom: "10px" }}>
                {issueDetail.title}
              </Title>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
              <Text style={{ marginBottom: "5px" }}>Title:</Text>
              <Input
                onChange={handleChange}
                readOnly={isReadOnly}
                value={issueTitle || ""}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <Text style={{ marginBottom: "5px" }}>Assignee:</Text>
              <Select
                onChange={handleAssigneeChange}
                bordered
                value={assigneeName}
                style={{ width: "100%" }}
              >
                {assignees === null ? (
                  <></>
                ) : (
                  assignees.map((assignee) => (
                    <Option value={assignee.id} key={assignee.id}>
                      {assignee.name}
                    </Option>
                  ))
                )}
              </Select>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
              <Text style={{ marginBottom: "5px" }}>Process:</Text>
              <Select
                onChange={handleProcessChange}
                bordered
                value={process?.name}
                style={{ width: "100%" }}
              >
                {processes.map((process) => (
                  <Option value={process.id} key={process.id}>
                    {process.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <Text style={{ marginBottom: "5px" }}>Status:</Text>
              <Select
                onChange={handleStatusChange}
                bordered
                value={status?.name}
                style={{ width: "100%" }}
              >
                {issuesStatus.map((status) => (
                  <Option value={status.id} key={status.id}>
                    {status.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
              <Text style={{ marginBottom: "5px" }}>Type:</Text>
              <Select
                onChange={handleTypeChange}
                bordered
                value={type?.name}
                style={{ width: "100%" }}
              >
                {issuesTypes.map((type) => (
                  <Option value={type.id} key={type.id}>
                    {type.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div style={{ flex: "1 1 50%", marginBottom: "10px" }}>
              <Text style={{ marginBottom: "5px" }}>Due Date:</Text>
              <DatePicker
                onChange={(e) => setIssueDuedate(e)}
                style={{ width: "100%" }}
                // disabled={isReadOnly}
                renderExtraFooter={() => "extra footer"}
                value={issueDuedate ? dayjs(issueDuedate, "YYYY-MM-DD") : null}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "10px", width: "50%" }}>
            <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
              <Text style={{ marginBottom: "5px" }}>Milestone:</Text>
              <Select
                onChange={handleMilestoneChange}
                bordered
                value={milestone?.title}
                style={{ width: "100%" }}
              >
                {milestones.map((milestone) => (
                  <Option value={milestone.id} key={milestone.id}>
                    {milestone.title}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text style={{ marginBottom: "5px" }}>Description:</Text>
            <Input.TextArea
              onChange={(e) => setIssueDescription(e.target.value)}
              readOnly={isReadOnly}
              value={issueDescription || ""}
              style={{ width: "100%" }}
            />
          </div>
          <Button
            onClick={handleEdit}
            style={{
              backgroundColor: "#2c51f5",
              marginRight: "20px",
            }}
            type="primary"
          >
            {btnEditText}
          </Button>
          <Button danger onClick={() => setOpenDialog(true)}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default IssueDetail;
