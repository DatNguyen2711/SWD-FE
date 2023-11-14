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
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useQueryAssignmnet from "../../hooks/useQueryAssignment";

const AddNewAssignment = ({ setSubjectData, setAllRecord }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [sortBy, setSortBy] = useState("id");
    const { id } = useParams();
    // State cho description field
    const [dueDate, setDueDate] = useState();
    const [description, setDescription] = useState();
  
    const { Assignment } = useQueryAssignmnet({
        orderBy,
        pageIndex,
        pageSize,
        sortBy, });
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
    const handleFormatDate = (date) => {
        if (date) {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          setDueDate(formattedDate);
        } else {
          setDueDate(null);
        }
      }; 
    const handleCreateSubject = () => {
      axios.post("/api/v1/assignment/create", {
        name,
        dueDate,
        description,
        
        })
        .then((response) => {
          console.log(response);
          setSubjectData((prev) => [response.data.data, ...prev]);
          setOpen(false);
          form.resetFields();
        });
      // console.log(id);
      // console.log(name);
      // console.log(description);
      // console.log(assignment);
    };
    
    
    return (
      <>
        <Button
          style={{ backgroundColor: "#2c51f5", marginLeft: "10px" }}
          type="primary"
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          New Subject
        </Button>
        <Drawer
          title="Create a new subject"
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
                onClick={handleCreateSubject}
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
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter assignment name",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Please enter assignment name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: "Please choose the dateTime",
                  },
                ]}
              >
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
                  rules={[
                    {
                      required: true,
                      message: "please enter description",
                    },
                  ]}
                >
                  <Input.TextArea
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="please enter description"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  };
  export default AddNewAssignment;