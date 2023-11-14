import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button, FormControl, InputLabel, Typography,OutlinedInput, Select, MenuItem, Checkbox, ListItemText, List, ListItem, ListItemButton, ListItemAvatar, Avatar, Box, Paper } from '@mui/material';
import authApi from '../../libs/axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ClassStudent = () => {
  const { id: classId } = useParams();
  const [studentList, setStudentList] = useState([]);
  const [studentName, setStudentName] = useState([]);
  const [studentInClass, setStudentInClass] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authApi.get("/api/v1/users/get-all");
        const users = response.data.data;
        const filteredStudents = users.filter((user) => user.role.name === "STUDENT");
        setStudentList(filteredStudents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setStudentName(event.target.value);
  };

  const students = studentName.map((student) => Number(student.id));

  useEffect(() => {
    async function fetchStudent() {
      await authApi.get(`/api/v1/class/get-detail/${classId}/students`)
        .then((res) => setStudentInClass(res.data.data.students))

    }
    fetchStudent();
  }, [classId]);



  const AddClassStudent = async () => {
    if (students.length === 0) {
      toast.error("Please choose a student !", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (studentInClass.some((student) => students.includes(student.id))) {
      toast.error("Student already in this class !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const res = await authApi.post("/api/v1/class/create/class-student", { classId, students });
    setStudentInClass((prev) => [...prev, ...res.data.data.students])

    if (res.data.statusCode === 200) {
      toast.success("Add successfully !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div>
    
      <Box display="flex" alignItems="center" mb={2}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Students</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={studentName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.map((student) => student.name).join(', ')}
            MenuProps={MenuProps}
          >
            {studentList.map((student) => (
              <MenuItem key={student.id} value={student}>
                <Checkbox checked={studentName.some((s) => s.id === student.id)} />
                <ListItemText primary={student.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ mt: 0.5,height:"56px" }} variant="contained" onClick={AddClassStudent}>Add Students</Button>
        <ToastContainer />
      </Box>
      <Paper elevation={3}>
        <List dense sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          {studentInClass.map((value) => {
            return (
              <ListItem
                key={value.id}
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value.id + 1}`}
                      src={value.picture}
                    />
                  </ListItemAvatar>
                  <Link >
                    <ListItemText id={value.id} primary={value.name} />
                  </Link>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>

  )
}

export default ClassStudent;
