import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NavBar from "../../components/common/NavBar";
import InfoIcon from "@mui/icons-material/Info";
import SideBar from "../../components/common/SideBar";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { Pagination } from "@mui/material";
import useQueryClass from "../../hooks/useQueryClass";
import CustomLinearProgress from "../../components/common/LinearProgress";
import { useEffect, useState } from "react";
import React from "react";
import AddNewClass from "./AddNewClass";
import { Link } from "react-router-dom";
const Class = () => {
  const [classList, setclassesList] = useState([]);
  const [open, setOpen] = useState(true);
  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [allRecord, setAllRecord] = useState(0);

  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? null : index));
  };
  const {
    classes,
    loading,
    error,
    totalrecords,
    pagesizeresponse,
    pageindexresponse,
  } = useQueryClass({ orderBy, pageIndex, pageSize, sortBy });

  useEffect(() => {
    if (!loading && classes) {
      setclassesList(classes);
    }
  }, [loading, classes, pageIndex]);

  useEffect(() => {
    var x = totalrecords % pagesizeresponse;
    var y = Math.floor(totalrecords / pagesizeresponse);
    const totalPages = x === 0 ? y : y + 1;
    setAllRecord(totalPages);
  }, [totalrecords, pagesizeresponse]);

  if (loading) {
    return (
      <div>
        <CustomLinearProgress />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="w-64">
          <SideBar />
        </div>
        <div className="ml-5 flex-1">
          <div className="flex justify-between items-center gap-10">
            <h2 className="text-2xl font-semibold mt-3">Classes</h2>
            <div className="mr-16 mt-5">
              <AddNewClass classList={classList} />
            </div>
          </div>

          <div>
            <List
              sx={{
                bgcolor: "background.paper",
                width: "100%",
                maxWidth: "1200px",
                borderBottom: "1px solid #ccc",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Nested List Items
                </ListSubheader>
              }
            >
              {classList.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItemButton onClick={() => handleClick(index)}>
                    <ListItemIcon>
                      <WorkspacesIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                    {openIndex === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={openIndex === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <Link to={`/class/${item.id}`}>View detail</Link>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </div>
          <Pagination
            style={{ marginTop: "50px" }}
            color="secondary"
            count={allRecord}
            variant="outlined"
            onChange={(e, value) => setPageIndex(value - 1)}
            shape="rounded"
          />
        </div>
      </div>
    </>
  );
};

export default Class;
