import React, { useState } from "react";
import axios from "../../libs/axios";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import useQuerySubjectType from "../../hooks/useQuerySubjectType";
const { Option } = Select;

const SubjectSearch = ({ setSubjectData, setAllRecord }) => {
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
    form.resetFields();
    setOpen(false);
  };
  const [name, setName] = useState("");

  const [subjectType, setSubjectType] = useState();

  const [dateTime, setDateTime] = useState("");

  const { subjectTypes } = useQuerySubjectType({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
  });

  const handleSubmit = async () => {
    console.log(name);
    console.log(subjectType);
    try {
      const response = await axios.post("/api/v1/subject/search", {
        name,
      });
      setSubjectData(response.data.data.subjectList);
      setAllRecord(response.data.data.totalRecords);
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
        title="Subject filter"
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
                rules={[
                  {
                    required: true,
                    message: "Please enter Name Subject",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Please enter Name Subject"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="subject"
                label="subject type"
                rules={[
                  {
                    required: true,
                    message: "Please choose the Subject ",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => setSubjectType(e)}
                  placeholder="Please choose the Subject "
                >
                  {subjectTypes.map((subject) => (
                    <Option value={subject.id}>{subject.name}</Option>
                  ))}
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
                  Search
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default SubjectSearch;
