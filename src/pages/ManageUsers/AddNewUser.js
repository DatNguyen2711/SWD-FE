import React, { useState } from "react";
import axios from "../../libs/axios";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import useQueryUser from "../../hooks/useQueryUser";

const { Option } = Select;

const AddNewUser = ({ setUserData }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [picture, setPicture] = useState("");
  const [username, setUserName] = useState("");

  const { users: assignees } = useQueryUser();

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

  const handleCreateUser = () => {
    axios
      .post("/api/v1/users/create", {
        name,
        email,
        phone_number: phoneNumber,
        picture,
        username,
      })
      .then((response) => {
        setUserData((prev) => [response.data.data, ...prev]);
        setOpen(false);
        form.resetFields();
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
        Add User
      </Button>
      <Drawer
        title="Add a new user"
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
              onClick={handleCreateUser}
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
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Please enter user name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter user email",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter user email"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phoneNumber" label="Phone Number">
                <Input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Please enter phone number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="picture" label="Picture URL">
                <Input
                  onChange={(e) => setPicture(e.target.value)}
                  placeholder="Please enter picture URL"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="username" label="Username">
                <Input
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Please enter username"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddNewUser;
