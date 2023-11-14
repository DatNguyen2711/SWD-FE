import React, { useState, useEffect } from 'react';
import axios from '../../libs/axios';
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { Card } from "antd";
import { Link } from "react-router-dom";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../ManageSystemSetting/css/SystemSetting.css";
import { formatDistanceToNow } from 'date-fns';
import * as XLSX from 'xlsx';

function SystemSettings() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [activeTabKey1, setActiveTabKey1] = useState("tab1");
    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [active, setActive] = useState(null);

    useEffect(() => {
        fetchData();
    }, [pageIndex]);

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/v1/system-setting/search', {
                orderBy: 0,
                pageIndex: pageIndex,
                pageSize: 9999,
                sortBy: "id",
                active: active,
                name: name,
                type: type,
            });

            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to export data to Excel
    const exportToExcel = () => {
        const dataToExport = data.data.systemSettingList;
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SystemSettingsData");
        const excelFileName = "SystemSettingsData.xlsx";
        XLSX.writeFile(wb, excelFileName);
    };

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeActive = (event) => {
        setActive(event.target.value);
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleEdit = (item) => {
        const editUrl = `/api/v1/system-setting/${item.id}`;
        console.log("Editing item:", item);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const totalPages = Math.ceil(data.data.totalRecords / data.data.pageSize);

    const tabList = [
        {
            key: "tab1",
            tab: "All",
        },
    ];

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'type', headerName: 'Type', width: 300 },
        {
            field: 'active',
            headerName: 'Status',
            width: 130,
            renderCell: (params) => (
                <div>
                    {params.value ? 'Active' : 'Deactivate'}
                </div>
            ),
        },
        {
            field: 'createdDate',
            headerName: 'Created Date',
            width: 200,
            valueGetter: (params) => {
                const createdDate = new Date(params.row.createdDate);
                return formatDistanceToNow(createdDate, { addSuffix: true });
            },
        },
        {
            field: 'updatedDate',
            headerName: 'Updated Date',
            width: 200,
            valueGetter: (params) => {
                const updatedDate = new Date(params.row.updatedDate);
                return formatDistanceToNow(updatedDate, { addSuffix: true });
            },
        },
        {
            headerName: 'Action',
            width: 75,
            renderCell: (params) => (
                <div>
                    <Link
                        to={`/system-setting/${params.row.id}`}
                        style={{
                            padding: '8px 16px',
                            background: '#007bff',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '4px',
                            display: 'inline-block',
                        }}
                    >
                        Edit
                    </Link>
                </div>
            )
        },
    ];

    const contentList = {
        tab1: (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data.data.systemSettingList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20, 30]}
                />
            </div>
        ),
        tab2: <p>content2</p>,
    };

    return (
        <>
            <NavBar />
            <div className="flex">
                <div className="w-64">
                    <Sidebar />
                </div>
                <div className="flex-1 mt-3">
                    <div className="flex items-center">
                        <h2 className="text-2xl font-semibold ml-4">System Settings</h2>
                        <div className="flex-grow">
                            <div className="search-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={name}
                                        onChange={handleChangeName}
                                    />
                                </div>
                                <div>
                                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={type}
                                            onChange={handleChange}
                                            autoWidth
                                            label="Age"
                                        >
                                            <MenuItem value="">
                                            </MenuItem>
                                            <MenuItem value={null}>All</MenuItem>
                                            <MenuItem value='Role'>Role</MenuItem>
                                            <MenuItem value='Semester'>Semester</MenuItem>
                                            <MenuItem value='Email'>Email</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 80 }}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={type}
                                            onChange={handleChangeActive}
                                            autoWidth
                                            label="Age"
                                        >
                                            <MenuItem value="">
                                            </MenuItem>
                                            <MenuItem value={null}>All</MenuItem>
                                            <MenuItem value={true}>Active</MenuItem>
                                            <MenuItem value={false}>Deactivate</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <button onClick={handleSearch} className='button-click'>Search</button>
                            </div>
                        </div>

                        <div className="mr-36">
                            <button onClick={exportToExcel} className="button-click">Export to Excel</button>
                            <Link to="/system-setting/create" className="button-click">Create New</Link>
                        </div>
                    </div>
                    <>
                        <Card
                            style={{
                                width: "100%",
                            }}
                            tabList={tabList}
                        >
                            {contentList[activeTabKey1]}
                        </Card>
                    </>
                </div>
            </div>
        </>
    );
}

export default SystemSettings;
