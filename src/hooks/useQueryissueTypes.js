import { useState, useEffect } from "react";
import axios from "../libs/axios";

function useQueryissueTypes({
  orderBy,
  pageIndex,
  pageSize,
  sortBy,
  name,
  type,
  classId,
  projectId,
  subjectId,
  active,
}) {
  const [issuesTypes, setIssuestypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalrecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/v1/issue-types/search", {
          orderBy,
          pageIndex,
          pageSize,
          sortBy,
          name,
          type,
          classId,
          projectId,
          subjectId,
          active,
        });
        pageIndex = response.data.data.pageIndex;
        pageSize = response.data.data.pageSize;
        setTotalRecords(response.data.data.totalRecords);
        setIssuestypes(response.data.data.issueSettingList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageIndex, pageSize, orderBy, sortBy]);

  return {
    issuesTypes,
    loading,
    error,
    totalrecords,
    pageSize,
    pageIndex,
  };
}

export default useQueryissueTypes;
