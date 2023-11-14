import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import SideBar from "../../components/common/SideBar";
import axios from "../../libs/axios";
import { useState } from "react";
import { Button, TextField,Typography } from "@mui/material";
import { Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import authApi from "../../libs/axios";
import useQuerySubjecctType from "../../hooks/useQuerySubjectType";
import { ToastContainer, toast } from "react-toastify";
import ClassStudent from "./ClassStudent";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ClassProject from "./ClassProject";
const ClassDetails = () => {
  const { id } = useParams();
  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [descDetail, setdescDetail] = useState();
  const [teacherDetail, setteacher] = useState({ id: -1 });
  const [semesterList, setsemesterList] = useState([]);
  const [className, setclassName] = useState("");
  const [subjectDetail, setsubject] = useState({ id: -1 });
  const [teacherList, setteacherList] = useState([]);
  const [semesterDetail, setsemester] = useState({ id: -1 });

  const [name, setnameChange] = useState();
  const [subject, setsubjectChange] = useState({ id: -1 });
  const [teacher, setteacherChange] = useState({ id: -1 });
  const [semester, setsemesterChange] = useState({ id: -1 });
  const [description, setdescChange] = useState();
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    const getClassDetail = async () => {
      const response = await axios.get(`/api/v1/class/get-detail/${id}`);
      const data = response.data.data;
      setdescDetail(data.description);
      setProjectList(data?.projects);
      setsubject(data?.subject === -1 ? "No Subject" : data.subject);
      setclassName(data.name);
      setteacher(data?.teacher === -1 ? "No Teacher" : data.teacher);
      setsemester(data?.semester === -1 ? "No Semester" : data.semester);

      //state change
      setnameChange(data.name);
      setsubjectChange(data.subject);
      setteacherChange(data?.teacher === -1 ? "No Teacher" : data.teacher);
      setsemesterChange(data.semester);
      setdescChange(data.description);
    };

    getClassDetail();
  }, [id]);
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
  const {
    subjectTypes: subjectList,
    loading,
    error,
    totalrecords,
    pagesizeresponse,
    pageindexresponse,
  } = useQuerySubjecctType({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
  });
  const semester_input = {
    active: true,
    orderBy: 0,
    pageSize: 0,
    sortBy: "id",
    type: "SEMESTER",
  };

  useEffect(() => {
    const getAllSemester = async () => {
      const response = await authApi.post(
        "/api/v1/system-setting/search",
        semester_input
      );
      setsemesterList(response.data.data.systemSettingList);
    };
    getAllSemester();
  }, []);
  const SaveUpdateChanges = async () => {
    if (!name) {
      toast.error("Please enter a name.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return; // Return early if the name is empty
    }
    try {
      const response = await authApi.put(`/api/v1/class/update/${id}`, {
        name,
        subjectId: subject.id,
        teacherId: teacher.id,
        semesterId: semester.id,
        description,
      });

      if (response.data.statusCode === 200) {
        toast.success("Changes saved successfully!", {
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

      await axios.get(`/api/v1/class/get-detail/${id}`);
    } catch (error) {
      // Handle error if the request fails
      console.error("Error saving changes:", error);
      toast.error("Error saving changes. Please try again.", {
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

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="w-64">
          <SideBar />
        </div>

        <div className="ml-5 flex-1">
          <div className="flex justify-between items-center gap-10">
            <h2 className="text-2xl font-semibold mt-3">Class's Detail</h2>
          </div>

          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="General " value="1" />
              <Tab label="Class Student" value="2" />
              <Tab label="Projects" value="3" />
            </TabList>
            <TabPanel value="1">
              {" "}
              <div className="mt-5">
                <Grid container style={{ marginTop: "10px" }} spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="subject-label">Name</InputLabel>
                    <TextField
                      onChange={(e) => setnameChange(e.target.value)}
                      id="outlined-basic"
                      value={name}
                      variant="outlined"
                      fullWidth
                      style={{ height: "70px", marginTop: "10px" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="subject-label">Subject</InputLabel>
                    <Select
                      labelId="subject-label"
                      id="subject-select"
                      value={subject ? subject.id : -1}
                      fullWidth
                      onChange={(e) => {
                        setsubjectChange({ ...subject, id: e.target.value });
                      }}
                      style={{ height: "55px", marginTop: "10px" }}
                      variant="outlined"
                    >
                      {subjectList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                      <MenuItem value={-1}>No subject</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="teacher-label">Teacher</InputLabel>
                    <Select
                      labelId="teacher-label"
                      id="teacher-select"
                      fullWidth
                      onChange={(e) => {
                        setteacherChange({ ...teacher, id: e.target.value });
                      }}
                      value={teacher ? teacher.id : -1}
                      style={{ height: "60px", marginTop: "10px" }}
                      variant="outlined"
                    >
                      <MenuItem value={-1}>No teacher</MenuItem>
                      {teacherList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="semester-label">Semester</InputLabel>
                    <Select
                      fullWidth
                      labelId="semester-label"
                      id="semester-select"
                      onChange={(e) => {
                        setsemesterChange({ ...semester, id: e.target.value });
                      }}
                      value={semester ? semester.id : -1}
                      style={{ height: "60px", marginTop: "10px" }}
                      variant="outlined"
                    >
                      {semesterList.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                      <MenuItem value={-1}>No Semester</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel id="semester-label">Description</InputLabel>

                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      value={description}
                      onChange={(e) => setdescChange(e.target.value)}
                      rows={4}
                      style={{ width: "100%", marginTop: "20px" }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </div>
              <div className="mt-4">
                <Button
                  variant="contained"
                  type="primary"
                  onClick={SaveUpdateChanges}
                >
                  Save Changes
                </Button>
              </div>
            </TabPanel>
            <TabPanel value="2"><ClassStudent /></TabPanel>
            <TabPanel value="3">
              <ClassProject setProjectList={setProjectList} />

            </TabPanel>
          </TabContext>


          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ClassDetails;
