import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import "react-toastify/dist/ReactToastify.css";
import useQuerySubjectType from "../../hooks/useQuerySubjectType";
import authApi from "../../libs/axios";
import { ToastContainer, toast } from "react-toastify";
const AddNewClass = ({ classList: allClass }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [subjectData, setsubjectData] = useState([]);
  const [Semester, setSemester] = useState([]);
  const [name, setClassName] = useState("");
  const [teacherId, setselectedTeacher] = useState("");
  const [semesterId, setselectedSemester] = useState("");
  const [subjectId, setselectedSubject] = useState("");
  const [description, setdesc] = useState("");
  const [teacherList, setteacherList] = useState([]);

  const { Option } = Select;

  const {
    subjectTypes,
    loading,
    error,
    totalrecords,
    pagesizeresponse,
    pageindexresponse,
  } = useQuerySubjectType({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
  });
  const semester_input = {
    active: true,
    name: "",
    orderBy: 0,
    pageIndex: 0,
    pageSize: 0,
    sortBy: "id",
    type: "Semester",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authApi.get("/api/v1/users/get-all");
        const users = response.data.data;
        const filteredTeachers = users.filter(
          (user) => user.role.name === "TEACHER"
        );
        setteacherList(filteredTeachers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getAllSemester = async () => {
    const response = await authApi.post(
      "/api/v1/system-setting/search",
      semester_input
    );
    setSemester(response.data.data.systemSettingList);
  };

  useEffect(() => {
    getAllSemester();
  }, []);
  const onClose = () => {
    setOpen(false);
  };
  const onClearAllField = () => {
    form.resetFields();
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const createClass = async () => {
    if (!name || !subjectId || !teacherId || !semesterId) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (allClass.some((classItem) => classItem.name === name)) {
      toast.error("Class with this name already exists.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      await authApi.post("/api/v1/class/create", {
        semesterId,
        subjectId,
        teacherId,
        name,
        description,
      });

      toast.success("Class created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onClearAllField();
      setOpen(false);
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error("Error creating class. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "#2c51f5", marginLeft: "10px" }}
        type="primary"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
        New Class
      </Button>
      <Drawer
        title="Create a new class"
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
              onClick={createClass}
              style={{ backgroundColor: "#2c51f5" }}
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
                    message: "Please enter class name",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Please enter issue title"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Subjects"
                label="Subject"
                rules={[
                  {
                    required: true,
                    message: "Please select an Subject",
                  },
                ]}
              >
                <Select
                  placeholder="Please select an Subject"
                  onSelect={(e) => setselectedSubject(e)}
                >
                  {subjectTypes.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Teachers"
                label="Teacher"
                rules={[
                  {
                    required: true,
                    message: "Please select an Teacher",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => setselectedTeacher(e)}
                  placeholder="Please select an Teacher"
                >
                  {teacherList.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Semester"
                label="Semester"
                rules={[
                  {
                    required: true,
                    message: "Please select an Semester",
                  },
                ]}
              >
                <Select
                  onSelect={(e) => setselectedSemester(e)}
                  placeholder="Please select an Semester"
                >
                  {Semester.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
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
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  onChange={(e) => setdesc(e.target.value)}
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
              <ToastContainer />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddNewClass;
