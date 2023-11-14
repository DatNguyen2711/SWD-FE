import React, { useEffect, useState } from "react";
import axios from "../../libs/axios";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { Button, DatePicker, Input, Select, Typography } from "antd";
import dayjs from "dayjs";
const { Option } = Select;
const { Title, Text } = Typography;

const AssignmentDetail = () => {
    const { id } = useParams();
    const [subjectDetail, setSubjectDetail] = useState({});
    const [assignmentDuedate, setAssignmentDuedate] = useState();
    const [description, setSubjectDescription] = useState();
    const [value, setValue] = useState(false);
    const [edit, setEdit] = useState(false);
    useEffect(() => {
      const fetchSubjectDetail = async () => {
        const response = await axios.get(`/api/v1/subject/get-detail/${id}`);
        setSubjectDetail(response.data.data);
        setName(response.data.data.name);
        setAssignmentDuedate(response.data.data.dueDate );
        setSubjectDescription(response.data.data.description);
      };
      fetchSubjectDetail();
    }, [id]);
  
    const [name, setName] = useState(subjectDetail.name);
    const handleTitleChange = (e) => {
        setName(e.target.value);
    };
    const handleDuedateChange = (e) => {
      setAssignmentDuedate(e);
    };
    const handleDescChange = (e) => {
      setSubjectDescription(e.target.value);
    };
    const handleEdit = () => {
        console.log("reponse chuyen ");
        console.log(id);
        console.log(name);
        console.log(assignmentDuedate);
        console.log(description);
      
      axios.put(`/api/v1/subject/update/${id}`, {
        id,
        name,
        description,
        assignmentDuedate:assignmentDuedate === null
        ? null
        : dayjs(assignmentDuedate).format("YYYY-MM-DD"),     
      });
      console.log("requ ");
      console.log(id);
        console.log(name);
        console.log(assignmentDuedate);
        console.log(description);
      console.log("oke");
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
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
                <Text style={{ marginBottom: "5px" }}>Name:</Text>
                <Input
                  onChange={handleTitleChange}
                  value={name}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ flex: "1 1 50%" }}>
              <Text style={{ marginBottom: "5px" }}>Due Date:</Text>
              <DatePicker
                onChange={handleDuedateChange}
                style={{ width: "100%" }}
                renderExtraFooter={() => "extra footer"}
                value={assignmentDuedate ? dayjs(assignmentDuedate, "YYYY-MM-DD") : null}
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
            <Button
              onClick={handleEdit}
              style={{ backgroundColor: "#2c51f5" }}
              type="primary"
            >
              Edit
            </Button>
          </div>
        </div>
      </>
    );
  };
  
  export default AssignmentDetail;