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


const { Option } = Select;

const AssignmentSearch = ({ setAssignmentData, setAllRecord }) => {
  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");
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
  const [name, setName] = useState(null);

  const handleSubmit = async () => {
    try {
      console.log("reponse chuyen ");
      console.log(name);
      const response = await axios.post("/api/v1/assignment/search", {
        name,
      });
      console.log("requ ");
      console.log(name);   
      console.log("oke");
      setAssignmentData(response.data.data.assignmentList);
      setAllRecord(response.data.data.totalPages);
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
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
                label="Name"
              >
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Please enter assignment name"
                />
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
export default AssignmentSearch;
