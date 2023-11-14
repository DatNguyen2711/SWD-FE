import React, { useEffect, useState } from "react";
import axios from "../../libs/axios";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { Button, DatePicker, Input, Select, Typography } from "antd";
import dayjs from "dayjs";
import useQueryUser from "../../hooks/useQueryUser";
import { ToastContainer, toast } from 'react-toastify';
const { Option } = Select;
const { Title, Text } = Typography;

const CreateSystemSetting = () => {
    const arrayType = ["Semester", "Role", "Email"];
    const arrayStatus = ["Active", "Deactivate"];
    // const [systemSetting, setSystemSetting] = useState([]);
    const [systemSetting, setSystemSetting] = useState({
        name: "",
        type: "",
        description: "",
    });
    const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);
    // const [value, setValue] = useState('');

    useEffect(() => {
        // Kiểm tra xem các trường name và type có dữ liệu hay không
        const isDataValid = systemSetting.name.trim() !== "" && systemSetting.type !== "";
        // Cập nhật trạng thái của nút "Create" dựa trên kết quả kiểm tra
        setIsCreateButtonDisabled(!isDataValid);
    }, [systemSetting.name, systemSetting.type]);

    const handleCreate = async () => {
        const createData = {
            "description": systemSetting.description,
            "name": systemSetting.name,
            "order": 0,
            "type": systemSetting.type
        }
        const response = await axios.post(`/api/v1/system-setting/create`, createData);
        console.log(response.data);
        if (response.data.statusCode !== 200) {
            toast.error(response.data.data, {
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
        else {
            toast.success('Create sucessfully!', {
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
    }

    const handleTitleChange = (e) => {
        setSystemSetting((prev) => ({ ...prev, name: e.target.value }));
    };

    const handleTypeChange = (value) => {
        setSystemSetting((prev) => ({ ...prev, type: value }));
    };

    // const handleStatusChange = (value) => {
    //     const isActive = value === "Active" ? true : false;
    //     setSystemSetting((prev) => ({ ...prev, active: isActive }));
    // };

    const handleDescChange = (e) => {
        setSystemSetting((prev) => ({ ...prev, description: e.target.value }));
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
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
                                {systemSetting.name}
                            </Title>
                        </div>
                    </div>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                        <div style={{ flex: "1 1 50%", marginRight: "10px" }}>
                            <Text style={{ marginBottom: "5px" }}>Title:</Text>
                            <Input
                                onChange={handleTitleChange}
                                value={systemSetting.name}
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div style={{ flex: "1 1 50%" }}>
                            <Text style={{ marginBottom: "5px" }}>Type:</Text>
                            <Select
                                onChange={handleTypeChange}
                                bordered
                                value={systemSetting.type}
                                style={{ width: "100%" }}
                            >
                                {arrayType.map((item) => (
                                    <Option value={item} key={item}>
                                        {item}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    {/* <div style={{ marginBottom: "10px" }}>
                        <Text style={{ marginBottom: "5px" }}>Status:</Text>
                        <Select
                            // onChange={handleAssigneeChange}
                            bordered
                            value={systemSetting.active ? "Active" : "Deactivate"}
                            style={{ width: "100%" }}
                        >
                            {arrayStatus.map((item) => (
                                <Option value={item} key={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    </div> */}
                    <div style={{ marginBottom: "10px" }}>
                        <Text style={{ marginBottom: "5px" }}>Description:</Text>
                        <Input.TextArea
                            onChange={handleDescChange}
                            value={systemSetting.description}
                            style={{ width: "100%" }}
                        />
                    </div>
                    <Button
                        onClick={handleCreate}
                        style={{ backgroundColor: "#2c51f5" }}
                        type="primary"
                        disabled={isCreateButtonDisabled}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CreateSystemSetting