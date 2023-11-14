import React from "react";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { useState } from "react";
import { Card, Select } from "antd";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import useQueryIssue from "../../hooks/useQueryIssue";
import CustomLinearProgress from "../../components/common/LinearProgress";
import {
  Alert,
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  Pagination,
  Snackbar,
} from "@mui/material";
import IssueAdvancedSearch from "./IssueAdvancedSearch";
import { useEffect } from "react";
import AddNewIssue from "./AddNewIssue";
import { Link, useLocation } from "react-router-dom";
import { Option } from "antd/es/mentions";
import useQueryUser from "../../hooks/useQueryUser";
import useQueryissueTypes from "../../hooks/useQueryissueTypes";
import useQueryMilestone from "../../hooks/useQueryMilestone";
import axios from "../../libs/axios";
function getRelativeTime(updatedDate) {
  const now = new Date();
  const updated = new Date(updatedDate);
  const diff = now.getTime() - updated.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  if (weeks > 0) {
    return `${weeks} weeks ago`;
  } else if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}
const Issues = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("projectId");
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [issuesData, setIssueData] = useState([]);
  const [allRecord, setAllRecord] = useState(0);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [assigneeId, setAssigneeId] = useState(null);
  const [issueTypeId, setIssueTypeId] = useState(null);
  const [issueStatusId, setIssueStatusId] = useState(null);
  const [processId, setProcessId] = useState(null);
  const [milestoneId, setMilestoneId] = useState(null);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsShowMessage(false);
  };

  const toggleCheckboxes = () => {
    if (showCheckboxes) {
      setAssigneeId(null);
      setMilestoneId(null);
      setIssueStatusId(null);
      setIssueTypeId(null);
      setProcessId(null);
      setSelectedItems([]);
    }
    setShowCheckboxes(!showCheckboxes);
  };

  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  const handleBulkEdit = () => {
    axios
      .post("/api/v1/issues/bulk-edit", {
        issueIds: selectedItems,
        issueTypeId,
        assigneeId,
        processId,
        issueStatusId,
        milestoneId,
      })
      .then((response) => {
        console.log(response);
        setSeverity("success");
        setMessage("Batch Update Issues Successfully!");
        setIsShowMessage(true);
        toggleCheckboxes();
      });
  };
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  const { data: assignees } = useQueryUser();
  const { milestones } = useQueryMilestone({
    pageSize: 9999,
  });
  const { issuesTypes } = useQueryissueTypes({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
    type: "Issue Type",
  });
  const { issuesTypes: issuesStatus } = useQueryissueTypes({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
    type: "Issue Status",
  });
  const { issuesTypes: processes } = useQueryissueTypes({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
    type: "Process",
  });

  const {
    issues,
    loading,
    error,
    totalrecords,
    pagesizeresponse,
    pageindexresponse,
  } = useQueryIssue({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
    projectId,
  });
  useEffect(() => {
    if (!loading && issues) {
      setIssueData(issues);
    }
  }, [loading, issues, pageIndex]);

  useEffect(() => {
    var x = totalrecords % pagesizeresponse;
    var y = Math.floor(totalrecords / pagesizeresponse);
    const totalPages = x === 0 ? y : y + 1;
    console.log(totalPages);
    console.log(totalPages);
    setAllRecord(totalPages);
  }, [totalrecords, pagesizeresponse]);
  if (loading) {
    return (
      <div>
        <CustomLinearProgress />
      </div>
    );
  }

  const tabList = [
    {
      key: "tab1",
      tab: "Open",
    },
    {
      key: "tab2",
      tab: "Closed",
    },
    {
      key: "tab3",
      tab: "All",
    },
  ];
  const contentList = {
    tab1: (
      <div>
        <List
          sx={{
            width: "70%",
            maxWidth: 900,
            height: "400px",
          }}
        >
          {issuesData.slice(0, 5).map((issue) => (
            <ListItem
              key={issue.id}
              style={{ borderBottom: "1px solid #f2f2f2", float: "left" }}
            >
              {showCheckboxes && (
                <Checkbox
                  checked={selectedItems.includes(issue.id)}
                  onChange={() => toggleItemSelection(issue.id)}
                />
              )}
              <ListItemAvatar>
                {issue.assignee === null ? (
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                ) : (
                  <Avatar src={issue.assignee?.picture} />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={<Link to={`/issue/${issue.id}`}>{issue.title}</Link>}
                secondary={`Updated at ${getRelativeTime(issue.updatedDate)}`}
              />

              <div>
                <ListItemText
                  sx={{ fontSize: "4px" }}
                  primary="Created by"
                  secondary={issue.createdBy}
                />
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    ),
    tab2: <p>content2</p>,
  };

  const paginate = (event, value) => {
    setPageIndex(value - 1);
  };
  return (
    <>
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
      <div className="flex">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="flex-1 mt-3">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold ml-4">Issues</h2>

            <div className="flex-grow"></div>

            <div className="mr-36">
              <IssueAdvancedSearch
                setPageIndex={setPageIndex}
                setAllRecord={setAllRecord}
                setIssueData={setIssueData}
                projectId={projectId}
              />
              {projectId !== null ? (
                <>
                  <AddNewIssue
                    setIsShowMessage={setIsShowMessage}
                    setMessage={setMessage}
                    setPageSize={setPageSize}
                    setPageIndex={setPageIndex}
                    setAllRecord={setAllRecord}
                    setIssueData={setIssueData}
                    projectId={projectId}
                    setSeverity={setSeverity}
                  />
                  <Button
                    style={{ marginLeft: "10px", height: "30px" }}
                    variant="outlined"
                    onClick={toggleCheckboxes}
                  >
                    Batch Update
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <>
            <Card
              style={{
                width: "100%",
              }}
              tabList={tabList}
              activeTabKey={activeTabKey1}
              onTabChange={onTab1Change}
            >
              {contentList[activeTabKey1]}
            </Card>
            <div>
              {showCheckboxes && (
                <div
                  style={{
                    width: "250px",
                    padding: "10px",
                    float: "right",
                    marginTop: "-440px",
                  }}
                >
                  <Button onClick={handleBulkEdit} variant="contained">
                    Update
                  </Button>
                  <Button
                    onClick={toggleCheckboxes}
                    variant="outlined"
                    color="error"
                    style={{ marginLeft: "20px" }}
                  >
                    Cancel
                  </Button>
                  <InputLabel
                    style={{ marginTop: "20px" }}
                    id="demo-simple-select-label"
                  >
                    Assignee
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Assignee"
                    style={{ width: "200px" }}
                    onSelect={(e) => setAssigneeId(e)}
                  >
                    <MenuItem value={null}>No Selection</MenuItem>
                    {assignees.map((assignee) => (
                      <MenuItem value={assignee.id}>{assignee.name}</MenuItem>
                    ))}
                  </Select>

                  <InputLabel
                    style={{ marginTop: "20px" }}
                    id="demo-simple-select-label1"
                  >
                    Milestone
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select1"
                    style={{ width: "200px" }}
                    onSelect={(e) => setMilestoneId(e)}
                  >
                    <MenuItem value={null}>No Selection</MenuItem>
                    {milestones.map((milestone) => (
                      <MenuItem value={milestone.id}>
                        {milestone.title}
                      </MenuItem>
                    ))}
                  </Select>

                  <InputLabel
                    style={{ marginTop: "20px" }}
                    id="demo-simple-select-label2"
                  >
                    Issue Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label2"
                    id="demo-simple-select2"
                    style={{ width: "200px" }}
                    onSelect={(e) => setIssueTypeId(e)}
                  >
                    <MenuItem value={null}>No Selection</MenuItem>
                    {issuesTypes.map((issuetype) => (
                      <MenuItem value={issuetype.id}>{issuetype.name}</MenuItem>
                    ))}
                  </Select>
                  <InputLabel
                    style={{ marginTop: "20px" }}
                    id="demo-simple-select-label3"
                  >
                    Issue Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label3"
                    id="demo-simple-select3"
                    style={{ width: "200px" }}
                    onSelect={(e) => setIssueStatusId(e)}
                  >
                    <MenuItem value={null}>No Selection</MenuItem>
                    {Array.isArray(issuesStatus)
                      ? issuesStatus.map((status) => (
                          <MenuItem value={status.id}>{status.name}</MenuItem>
                        ))
                      : null}
                  </Select>
                  <InputLabel
                    style={{ marginTop: "20px" }}
                    id="demo-simple-select-label4"
                  >
                    Process
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label4"
                    id="demo-simple-select4"
                    style={{ width: "200px" }}
                    onSelect={(e) => setProcessId(e)}
                  >
                    <MenuItem value={null}>No Selection</MenuItem>
                    {Array.isArray(processes)
                      ? processes.map((process) => (
                          <MenuItem value={process.id}>{process.name}</MenuItem>
                        ))
                      : null}
                  </Select>
                </div>
              )}
            </div>
          </>{" "}
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "left",
              marginLeft: "30px",
            }}
            onChange={paginate}
            color="primary"
            count={allRecord}
            shape="rounded"
          />
        </div>
      </div>
    </>
  );
};

export default Issues;
