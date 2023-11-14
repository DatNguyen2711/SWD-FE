import React, { useState } from "react";
import dayjs from "dayjs";
import axios from "../../libs/axios";
import { SearchOutlined } from "@ant-design/icons";
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
import useQuerryissueTypes from "../../hooks/useQueryissueTypes";
import useQueryissueTypes from "../../hooks/useQueryissueTypes";
import useQueryMilestone from "../../hooks/useQueryMilestone";

const { Option } = Select;

const IssueAdvancedSearch = ({ setIssueData, setAllRecord, projectId }) => {
  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  // const [totalrecords, setTotalRecords] = useState(0);
  // const [pagesizeresponse, setPagesizeResponse] = useState(0);
  // const [pageindexresponse, setPageindexResponse] = useState(0);
  //4 cái trên chỉ để truyền vào rồi get all issue type
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onClearAllField = () => {
    form.resetFields(); // Đây là dòng mới được thêm vào
    setOpen(false);
  };
  const [title, setTitle] = useState(null);
  const [owner, setOwner] = useState();
  const [dateTime, setDateTime] = useState("");
  const [issueTypeId, setIssueTypeId] = useState(null);
  const [issueStatusId, setIssueStatusId] = useState(null);
  const [processId, setProcessId] = useState(null);
  const [milestoneId, setMilestoneId] = useState(null);

  const { users: assignee } = useQueryUser();
  const { issuesTypes } = useQuerryissueTypes({
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/v1/issues/search", {
        title,
        issueStatusId,
        issueTypeId,
        processId,
        milestoneId,
        dueDate: dateTime,
        projectId,
      });
      var pageSize = response.data.data.pageSize;
      var totalRecords = response.data.data.totalRecords;
      var x = totalRecords % pageSize;
      var y = Math.floor(totalRecords / pageSize);
      var totalPages = x === 0 ? y : y + 1;
      setIssueData(response.data.data.issueList);
      setAllRecord(totalPages);
      setPageIndex(response.data.data.pageIndex);
      setPageSize(response.data.data.pageSize);
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormatDate = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setDateTime(formattedDate);
    } else {
      setDateTime(null);
    }
  };
  return (
    <>
      <Button
        style={{ backgroundColor: "#0f182e" }}
        type="primary"
        onClick={showDrawer}
        icon={<SearchOutlined />}
      >
        Search
      </Button>
      <Drawer
        title="Issues filter"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Title"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please enter issue title",
                //   },
                // ]}
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select an Milestone",
                //   },
                // ]}
              >
                <Select
                  onSelect={(e) => setMilestoneId(e)}
                  placeholder="Please select an Milestone"
                >
                  <Option value={null}>All Milestones</Option>
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select an assignee",
                //   },
                // ]}
              >
                <Select
                  onSelect={(e) => setOwner(e)}
                  placeholder="Please select an owner"
                >
                  <Option value={null}>All Assignees</Option>
                  {Array.isArray(assignee)
                    ? assignee.map((assignee) => (
                        <Option value={assignee.id}>{assignee.name}</Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select an Status",
                //   },
                // ]}
              >
                <Select
                  onSelect={(e) => setIssueStatusId(e)}
                  placeholder="Please select an status"
                >
                  <Option value={null}>All Status</Option>
                  {Array.isArray(issuesStatus)
                    ? issuesStatus.map((status) => (
                        <Option value={status.id}>{status.name}</Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please choose the type",
                //   },
                // ]}
              >
                <Select
                  onSelect={(e) => setIssueTypeId(e)}
                  placeholder="Please choose the Issue type"
                >
                  <Option value={null}>All Type</Option>
                  {issuesTypes.map((issuetype) => (
                    <Option value={issuetype.id}>{issuetype.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="Duedate"
                rules={[
                  {
                    required: true,
                    message: "Please choose the Duedate",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "334px" }}
                  renderExtraFooter={() => "extra footer"}
                  onChange={handleFormatDate}
                  value={dateTime ? dayjs(dateTime, "YYYY-MM-DD") : null}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="process"
                label="Process"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please choose the process",
                //   },
                // ]}
              >
                <Select
                  onSelect={(e) => setProcessId(e)}
                  placeholder="Please choose the Process"
                >
                  <Option value={null}>All Processes</Option>
                  {Array.isArray(processes)
                    ? processes.map((process) => (
                        <Option value={process.id}>{process.name}</Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} style={{ float: "right" }}>
            <Col span={24}>
              <Space>
                <Button
                  onClick={onClearAllField}
                  style={{ borderColor: "#168DC" }}
                >
                  Cancel
                </Button>
                <Button
                  style={{ backgroundColor: "#0f182e" }}
                  onClick={handleSubmit}
                  type="primary"
                >
                  Save
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default IssueAdvancedSearch;
