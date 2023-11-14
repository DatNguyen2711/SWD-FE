import React, { useEffect, useState } from "react";
import axios from "../../libs/axios";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { Button, Input, Typography, Tabs } from "antd";
import dayjs from "dayjs";
import useQueryAssignmnet from "../../hooks/useQueryAssignment";
import SubjectSearch from "./SubjectSearch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import Assignment from "../Assignment/Assignment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
const { TabPane } = Tabs;
const { Title, Text } = Typography;

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

const SubjectDetail = () => {
  const { id } = useParams();
  const [subjectDetail, setSubjectDetail] = useState({});
  const [name, setName] = useState("");
  const [description, setSubjectDescription] = useState("");
  const [assignment, setAssignment] = useState({ id: null, name: null });
  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [activeTabKey, setActiveTabKey] = useState("tab1");
  useEffect(() => {
    const fetchSubjectDetail = async () => {
      const response = await axios.get(`/api/v1/subject/get-detail/${id}`);
      setAssignment(response.data.data.assignment);
      setSubjectDetail(response.data.data);
      //setAssigneeName(response.data.data.assignee?.name);
      setName(response.data.data.name);
      //setIssueDuedate(response.data.data.dueDate );
      setSubjectDescription(response.data.data.description);
    };
    fetchSubjectDetail();
  }, [id]);
  const handleTitleChange = (e) => {
    setName(e.target.value);
  };
  const handleAsignmentChange = (e) => {
    setAssignment(e.target.value);
  };
  const handleDescChange = (e) => {
    setSubjectDescription(e.target.value);
  };
  const { asignment } = useQueryAssignmnet({
    pageSize: 9999,
    type: "Issue Type",
  });
  const handleTypeChange = (e) => {
    const updateAssignment = { ...assignment };
    updateAssignment.id = e;
    const selectedAssignmentName = asignment.find((type) => type.id === e);
    if (selectedAssignmentName)
      updateAssignment.name = selectedAssignmentName.name;

    setAssignment(updateAssignment);
  };
  const handleEdit = () => {
    console.log("reponse chuyen ");
    console.log(id);
    console.log(name);
    console.log(assignment);
    console.log(description);

    axios.put(`/api/v1/subject/update/${id}`, {
      id,
      name,
      description,
      assignments: [],
    });
    console.log("requ ");
    console.log(id);
    console.log(name);
    console.log(assignment);
    console.log(description);
    console.log("oke");
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    //setActiveTabKey1(key);
  };

  return (
    <>
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
                {subjectDetail.name}
              </Title>
            </div>
          </div>
          <Tabs activeKey={activeTabKey} onChange={handleTabChange}>
            <TabPane tab="General" key="tab1">
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
                  <Text style={{ marginBottom: "5px" }}>Name:</Text>
                  <Input
                    onChange={handleTitleChange}
                    value={name}
                    style={{ width: "100%" }}
                  />
                </div>
                <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
                  <Text style={{ marginBottom: "5px" }}>Assignment:</Text>
                  <Input.TextArea
                    onChange={handleAsignmentChange}
                    value={assignment}
                    style={{ width: "100%" }}
                  />
                  {/* <Select
                    onSelect={(e) => setAssignment(e)}
                    placeholder="Please select an Assignment"
                  >
                    <Option value={null}>All Assignment</Option>
                    {Assignment.map((assignment) => (
                      <Option value={assignment.id}>{assignment.name}</Option>
                    ))}
                  </Select> */}
                </div>
                {/* <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
                  <Text style={{ marginBottom: "5px" }}>Type:</Text>
                  <Select
                    onChange={handleTypeChange}
                    bordered
                    value={assignment?.name}
                    style={{ width: "100%" }}
                  >
                    {assignment.map((assignment) => (
                      <Option value={assignment.id} key={assignment.id}>
                        {assignment.name}
                      </Option>
                    ))}
                  </Select>
                </div> */}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <Text style={{ marginBottom: "5px" }}>Description:</Text>
                <Input.TextArea
                  onChange={handleDescChange}
                  value={description}
                  style={{ width: "100%" }}
                />
              </div>
              <Button
                onClick={handleEdit}
                style={{ backgroundColor: "#2c51f5" }}
                type="primary"
              >
                Edit
              </Button>
            </TabPane>
            {/* ============================================= */}
            <TabPane tab="Assignment" key="tab2">
              <Assignment />
            </TabPane>
            {/* ============================================= */}
            <TabPane tab="Setting" key="tab3">
              {/* Render setting content here */}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default SubjectDetail;
