import { useState, useEffect } from "react";
import axios from "../libs/axios";

function useQueryMilestone({
  orderBy,
  pageIndex,
  pageSize,
  sortBy,
  classId,
  projectId
}) {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalrecords, setTotalRecords] = useState(0);
  const [pagesizeresponse, setPagesizeResponse] = useState(0);
  const [pageindexresponse, setPageindexResponse] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/v1/milestone/search", {
            orderBy,
            pageIndex,
            pageSize,
            sortBy,
            classId,
            projectId
        });
        setPageindexResponse(response.data.data.pageIndex);
        setPagesizeResponse(response.data.data.pageSize);
        setTotalRecords(response.data.data.totalRecords);
        setMilestones(response.data.data.milestoneList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageIndex, orderBy, sortBy,pageSize]);

  return {
    milestones,
    loading,
    error,
    totalrecords,
    pagesizeresponse,
    pageindexresponse,
  };
}

export default useQueryMilestone;
