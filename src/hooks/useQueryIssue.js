import { useState, useEffect } from "react";
import authApi from "../libs/axios";

function useQueryIssue({
  orderBy,
  pageIndex,
  pageSize,
  sortBy,
  name,
  dateTime,
  owner,
  issuetype,
  projectId,
}) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalrecords, setTotalRecords] = useState(0);
  const [pagesizeresponse, setPagesizeResponse] = useState(0);
  const [pageindexresponse, setPageindexResponse] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authApi.post("/api/v1/issues/search", {
          orderBy,
          pageIndex,
          pageSize,
          sortBy,
          name,
          dateTime,
          owner,
          issuetype,
          projectId,
        });
        setPageindexResponse(response.data.data.pageIndex);
        setPagesizeResponse(response.data.data.pageSize);
        setTotalRecords(response.data.data.totalRecords);
        setIssues(response.data.data.issueList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageIndex, orderBy, sortBy, pageSize, projectId]);

  return {
    issues,
    loading,
    error,
    totalrecords,
    pagesizeresponse,
    pageindexresponse,
  };
}

export default useQueryIssue;
