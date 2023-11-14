import React, { useState } from "react";
import axios from "../../libs/axios";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import useQueryUser from "../../hooks/useQueryUser";
import useQueryissueTypes from "../../hooks/useQueryissueTypes";
import dayjs from "dayjs";
import useQueryIssue from "../../hooks/useQueryIssue";
import { useEffect } from "react";
import useQueryMilestone from "../../hooks/useQueryMilestone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Snackbar } from "@mui/material";
const { Option } = Select;
const AddNewIssue = ({
  setIssueData,
  setAllRecord,
  setIsShowMessage,
  setMessage,
  projectId,
  setSeverity,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");

  const [assigneeId, setAssigneeId] = useState(null);
  const [description, setDescription] = useState();
  const [issueTypeId, setIssueTypeId] = useState();
  const [issueStatusId, setIssueStatusId] = useState();
  const [processId, setProcessId] = useState();
  const [milestoneId, setMilestoneId] = useState();

  const { milestones } = useQueryMilestone({
    pageSize: 9999,
  });

  // State cho dateTime field
  const [dueDate, setdueDate] = useState("");

  const { data: assignees } = useQueryUser();
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
  const { issues } = useQueryIssue({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
  });
  const showDrawer = () => {
    console.log(assignees);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClearAllField = () => {
    form.resetFields(); // Đây là dòng mới được thêm vào
    setOpen(false);
  };
  const handleFormatDate = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setdueDate(formattedDate);
    } else {
      setdueDate(null);
    }
  };

  const handleCreateIssue = () => {
    if (title === null) {
      setSeverity("error");
      setIsShowMessage(true);
      setMessage("Title is required!");
      return;
    }
    axios
      .post("/api/v1/issues/create", {
        title,
        description,
        dueDate,
        issueTypeId,
        assigneeId,
        processId,
        issueStatusId,
        milestoneId,
        projectId,
      })
      .then((response) => {
        console.log("create issue", response);
        if (response.data.statusCode === 200) {
          setIssueData((prev) => [response.data.data, ...prev]);
          setTitle("");
          setDescription("");
          setdueDate(null);
          setIssueTypeId(null);
          setIssueStatusId(null);
          setAssigneeId(null);
          setMilestoneId(null);
          setProcessId(null);
          setSeverity("success");
          setIsShowMessage(true);
          setMessage("Add New Issue Successfully!");
          setOpen(false);
          form.resetFields();
        }
      });
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "#2c51f5", marginLeft: "10px" }}
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        New Issue
      </Button>
      <Drawer
        title="Create a new issue"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClearAllField}>Cancel</Button>
            <Button
              style={{ backgroundColor: "#2c51f5" }}
              onClick={handleCreateIssue}
              type="primary"
            >
              Add
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter issue title",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Please enter issue title"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="milestone"
                label="Milestone"
                rules={[
                  {
                    required: true,
                    message: "Please select an Milestone",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => setMilestoneId(e)}
                  placeholder="Please select an Milestone"
                >
                  {milestones.map((milestone) => (
                    <Option value={milestone.id}>{milestone.title}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Assignee"
                rules={[
                  {
                    required: true,
                    message: "Please select an Assignee",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => setAssigneeId(e)}
                  placeholder="Please select an owner"
                >
                  {assignees.map((assignee) => (
                    <Option value={assignee.id}>{assignee.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => setIssueTypeId(e)}
                  placeholder="Please choose the Issue type"
                >
                  {issuesTypes.map((issuetype) => (
                    <Option value={issuetype.id}>{issuetype.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Please select an Status",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => setIssueStatusId(e)}
                  placeholder="Please select an status"
                >
                  {Array.isArray(issuesStatus)
                    ? issuesStatus.map((status) => (
                        <Option value={status.id}>{status.name}</Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="process"
                label="Process"
                rules={[
                  {
                    required: true,
                    message: "Please choose the process",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => setProcessId(e)}
                  placeholder="Please choose the Process"
                >
                  {Array.isArray(processes)
                    ? processes.map((process) => (
                        <Option value={process.id}>{process.name}</Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dateTime" label="Due Date">
                <DatePicker
                  style={{ width: "334px" }}
                  renderExtraFooter={() => "extra footer"}
                  onChange={handleFormatDate}
                  value={dueDate ? dayjs(dueDate, "YYYY-MM-DD") : null}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                // rules={[
                //   {
                //     required: true,
                //     message: "please enter url description",
                //   },
                // ]}
              >
                <Input.TextArea
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default AddNewIssue;
