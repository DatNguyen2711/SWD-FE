import React from "react";
import NavBar from "../../components/common/NavBar";
import Sidebar from "../../components/common/SideBar";
import { useState } from "react";
import { Card } from "antd";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import useQuerySubjectType from "../../hooks/useQuerySubjectType";
import CustomLinearProgress from "../../components/common/LinearProgress";
import { Pagination } from "@mui/material";
import SubjectSearch from "./SubjectSearch";
import { useEffect } from "react";
import AddNewSubject from "./AddNewSubject";
import Project from "../ProjectManage/Project";
import { Link } from "react-router-dom";


function getRelativeTime(updatedDate) {
  const now = new Date();
  const updated = new Date(updatedDate);
  const diff = now.getTime() - updated.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  if (weeks > 0) {
    return `${weeks} weeks ago`;
  } else if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}
const SubjectManage = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [orderBy, setOrderBy] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [SubjectData, setSubjectData] = useState([]);
  const [allRecord, setAllRecord] = useState(0);
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
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
  useEffect(() => {
    if (!loading && subjectTypes) {
      setSubjectData(subjectTypes);
    }
  }, [loading, subjectTypes, pageIndex]);
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
  const tabList = [
    {
      key: "tab1",
      tab: "Subject",
    },
    {
      key: "tab2",
      tab: "",
    },
    {
      key: "tab3",
      tab: "",
    },
  ];
  const contentList = {
    tab1: (
      <List
        sx={{
          width: "100%",
          maxWidth: 1100,
        }}
      >
        {SubjectData?.slice(0, 5).map((subject) => (
          <ListItem
            key={subject.id}
            style={{ borderBottom: "1px solid #f2f2f2" }}
          >
            <ListItemText
              primary={<Link to={`/subject/${subject.id}`}>{subject.name}</Link>}
              secondary={`Updated at ${getRelativeTime(subject.updatedDate)}`}
            />
            
            <div>
              <ListItemText
                sx={{ marginLeft: "750px", fontSize: "4px" }}
                primary="Created by"
                secondary={subject?.createdBy}
              />
            </div>
          </ListItem>
        ))}
      </List>
    ),
  };
  const paginate = (event, value) => {
    setPageIndex(value - 1);
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
            <h2 className="text-2xl font-semibold ml-4">Subject</h2>

            <div className="flex-grow"></div>

            <div className="mr-36">
              <SubjectSearch
                setPageIndex={setPageIndex}
                setAllRecord={setAllRecord}
                setSubjectData={setSubjectData}
              />
              <AddNewSubject
              setPageSize={setPageSize}
                setPageIndex={setPageIndex}
                setAllRecord={setAllRecord}
                setSubjectData={setSubjectData}
              />
            </div>
          </div>
          <>
            <Card
              style={{
                width: "100%",
              }}
              tabList={tabList}
              activeTabKey={activeTabKey1}
              onTabChange={onTab1Change}
            >
              {contentList[activeTabKey1]}
            </Card>
          </>{" "}
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "left",
              marginLeft: "30px",
            }}
            onChange={paginate}
            color="primary"
            count={allRecord}
            shape="rounded"
          />
        </div>
      </div>
    </>
  );
};

export default SubjectManage;
