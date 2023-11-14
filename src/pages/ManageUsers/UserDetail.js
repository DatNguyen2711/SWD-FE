import React, { useEffect, useState } from "react";
import axios from "../../libs/axios";
import { useParams } from "react-router-dom";
import { Typography, Input, Button } from "antd";

const { Title, Text } = Typography;

const UserDetail = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const response = await axios.get(`/api/v1/users/get-detail/${id}`);
      setUserDetail(response.data.data.user);
      setUserName(response.data.data.user?.name);
      setUserEmail(response.data.data.email);
      setUserPhoneNumber(response.data.data.user.phone_number);
      setUserPicture(response.data.data.picture);
    };
    fetchUserDetail();
  }, [id]);

  const handleEdit = async () => {
    // Thực hiện xử lý chỉnh sửa thông tin người dùng ở đây
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "0 0 64px" }}>
          {/* Đặt nội dung cho phần sidebar hoặc menu điều hướng ở đây */}
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
                User Profile
              </Title>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
              <Text style={{ marginBottom: "5px" }}>Name:</Text>
              <Input
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                style={{ width: "100%" }}
                disabled={!isEditing}
              />
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <Text style={{ marginBottom: "5px" }}>Email:</Text>
              <Input
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                style={{ width: "100%" }}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text style={{ marginBottom: "5px" }}>Phone Number:</Text>
            <Input
              onChange={(e) => setUserPhoneNumber(e.target.value)}
              value={userPhoneNumber}
              style={{ width: "100%" }}
              disabled={!isEditing}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text style={{ marginBottom: "5px" }}>Picture URL:</Text>
            <Input
              onChange={(e) => setUserPicture(e.target.value)}
              value={userPicture}
              style={{ width: "100%" }}
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <Button
              onClick={handleEdit}
              style={{ backgroundColor: "#2c51f5" }}
              type="primary"
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: "#2c51f5" }}
              type="primary"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetail;

  // const [issueTitle, setIssuetitle] = useState(issueDetail.title);
  // const handleTitleChange = (e) => {
  //   setIssuetitle(e.target.value);
  // };
  // const handleAssigneeChange = (e) => {
  //   setIssueAssignee(e);
  //   setAssigneeName(assignees.find((a) => a.id === assigneeID));
  // };
  // const handleDuedateChange = (e) => {
  //   setIssueDuedate(e);
  // };
  // const handleDescChange = (e) => {
  //   setIssueDescription(e.target.value);
  // };
  // const handleEdit = () => {
  // const formattedDate = dayjs(issueDuedate).format("YYYY-MM-DD");

  //   axios.put(`/api/v1/issues/update/${id}`, {
  //     id,
  //     issueTitle,
  //     issueAssignee,
  //     issueDuedate:formattedDate,
  //     issueDescription,
  //   });
  //   console.log(id);
  //   console.log(issueTitle);
  //   console.log(issueAssignee);
  //   console.log(issueDuedate);
  //   console.log(issueDescription);
  //   console.log("oke");