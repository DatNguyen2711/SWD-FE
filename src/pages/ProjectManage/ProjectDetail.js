import React, { useEffect, useState } from "react";
import axios from "../../libs/axios";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { Button, Input, Select, Typography } from "antd";
const { Option } = Select;
const { Title, Text } = Typography;

const ProjectDetail = () => {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState({});
  const [description, setProjectDescription] = useState();
  const [value, setValue] = useState(false);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const fetchSubjectDetail = async () => {
      const response = await axios.get(`/api/v1/projects/get-detail/${id}`);
      setProjectDetail(response.data.data);
      setName(response.data.data.name);
      setStatus(response.data.data.status);
      setProjectDescription(response.data.data.description);
      setGitLabProject(response.data.data.gitlabProjectId);
    };
    fetchSubjectDetail();
  }, [id]);

  const [name, setName] = useState(projectDetail.name);
  const handleTitleChange = (e) => {
    setName(e.target.value);
  };
  const [status, setStatus] = useState();
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const [gitlabProjectId, setGitLabProject] = useState();
  const handleGitChange = (e) => {
    setGitLabProject(e.target.value);
  };

  const handleDescChange = (e) => {
    setProjectDescription(e.target.value);
  };
  const handleEdit = () => {
    axios.put(`/api/v1/projects/update/${id}`, {
      id,
      name,
      status,
      description,
      gitlabProjectId,
    });
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
                {projectDetail.name}
              </Title>
            </div>
          </div>
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
              <Text style={{ marginBottom: "5px" }}>Status:</Text>
              <Input
                onChange={handleStatusChange}
                value={status}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text style={{ marginBottom: "5px" }}>Description:</Text>
            <Input.TextArea
              onChange={handleDescChange}
              value={description}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
            <Text style={{ marginBottom: "5px" }}>GitLabProject:</Text>
            <Input
              onChange={handleGitChange}
              value={gitlabProjectId}
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
          <Button
            onClick={() => {
              window.location.href = `/issue?projectId=${id}`;
            }}
            style={{ backgroundColor: "#2c51f5" }}
            type="primary"
          >
            Issues List
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;