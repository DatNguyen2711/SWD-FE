import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../libs/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const IssueSettingModal = ({
  issueSetting,
  setIssueSetting,
  open,
  handleClose,
  issueSettingData,
  setIssueSettingData,
}) => {
  const [projects, setProjects] = useState([]);
  // const [classes, setClasses] = useState([]);
  // const [subjects, setSubjects] = useState([]);

  // useEffect(() => {
  //   axios
  //     .post("/api/v1/class/search", {
  //       orderBy: 0,
  //       sortBy: "id",
  //       pageSize: 9999,
  //     })
  //     .then((response) => {
  //       setClasses(response.data.data.classList);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .post("/api/v1/subject/search", {
  //       orderBy: 0,
  //       sortBy: "id",
  //       pageSize: 9999,
  //     })
  //     .then((response) => {
  //       setSubjects(response.data.data.subjectList);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .post("/api/v1/projects/search", {
        orderBy: 0,
        sortBy: "id",
        pageSize: 9999,
      })
      .then((response) => {
        setProjects(response.data.data.projectList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = () => {
    if (issueSetting?.id === null) {
      axios
        .post("/api/v1/issue-types/create", {
          name: issueSetting?.name,
          type:
            issueSetting?.type === "No Selection" ? null : issueSetting?.type,
          description: issueSetting?.description,
          classId: issueSetting?.classId === -1 ? null : issueSetting?.classId,
          subjectId:
            issueSetting?.subjectId === -1 ? null : issueSetting?.subjectId,
          projectId:
            issueSetting?.projectId === -1 ? null : issueSetting?.projectId,
        })
        .then((response) => {
          console.log(response);
          setIssueSettingData((prev) => [response.data.data, ...prev]);
          handleClose();
        });
    } else {
      axios
        .put(`/api/v1/issue-types/update/${issueSetting?.id}`, {
          id: issueSetting?.id,
          name: issueSetting?.name,
          type:
            issueSetting?.type === "No Selection" ? null : issueSetting?.type,
          description: issueSetting?.description,
          classId: issueSetting?.classId === -1 ? null : issueSetting?.classId,
          subjectId:
            issueSetting?.subjectId === -1 ? null : issueSetting?.subjectId,
          projectId:
            issueSetting?.projectId === -1 ? null : issueSetting?.projectId,
        })
        .then((response) => {
          console.log(response);
          const updatedItem = response.data.data;
          const updatedList = issueSettingData.map((item) => {
            if (item.id === updatedItem.id) {
              return updatedItem;
            }
            return item;
          });
          setIssueSettingData(updatedList);
          handleClose();
        });
    }
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          {issueSetting?.id === null
            ? "Add New Issue Setting"
            : "Update Issue Setting"}
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel
                style={{ marginTop: "20px" }}
                id="demo-simple-select-label0"
              >
              </InputLabel>
              <TextField
                id="outlined-basic"
                labelId="demo-simple-select-label0"
                variant="outlined"
                style={{ width: "250px" }}
                value={issueSetting?.name}
                onChange={(e) => {
                  setIssueSetting({ ...issueSetting, name: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                style={{ marginTop: "20px" }}
                id="demo-simple-select-label"
              >
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={issueSetting?.type}
                style={{ width: "250px" }}
                onChange={(e) => {
                  setIssueSetting({ ...issueSetting, type: e.target.value });
                }}
              >
                <MenuItem value={"No Selection"}>No Selection</MenuItem>
                <MenuItem value={"Issue Type"}>Issue Type</MenuItem>
                <MenuItem value={"Issue Status"}>Issue Status</MenuItem>
                <MenuItem value={"Process"}>Process</MenuItem>
              </Select>
            </Grid>
            {/* <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label1">Class</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                value={issueSetting?.classId}
                style={{ width: "250px" }}
                onChange={(e) => {
                  setIssueSetting({
                    ...issueSetting,
                    classId: e.target.value,
                  });
                }}
              >
                <MenuItem value={-1}>No Selection</MenuItem>
                {classes.map((c) => (
                  <MenuItem value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
            </Grid> */}
            {/* <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label2">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={issueSetting?.subjectId}
                style={{ width: "250px" }}
                onChange={(e) => {
                  setIssueSetting({
                    ...issueSetting,
                    subjectId: e.target.value,
                  });
                }}
              >
                <MenuItem value={-1}>No Selection</MenuItem>
                {subjects.map((c) => (
                  <MenuItem value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
            </Grid> */}
          </Grid>
          <div>
            <div
              style={{
                marginTop: "20px",
                float: "left",
              }}
            >
              <InputLabel id="demo-simple-select-label3">Project</InputLabel>
              <Select
                labelId="demo-simple-select-label3"
                id="demo-simple-select3"
                style={{ width: "250px" }}
                onChange={(e) => {
                  setIssueSetting({
                    ...issueSetting,
                    projectId: e.target.value,
                  });
                }}
                value={issueSetting?.projectId}
              >
                <MenuItem value={-1}>No Selection</MenuItem>
                {projects.map((c) => (
                  <MenuItem value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              value={issueSetting?.description}
              style={{ width: "580px", marginTop: "20px" }}
              onChange={(e) => {
                setIssueSetting({
                  ...issueSetting,
                  description: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <Button
              style={{ marginTop: "10px" }}
              onClick={handleSubmit}
              variant="contained"
            >
              {issueSetting?.id == null ? "Add" : "Update"}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              style={{ marginLeft: "20px", marginTop: "10px" }}
            >
              Cancel
            </Button>
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default IssueSettingModal;
