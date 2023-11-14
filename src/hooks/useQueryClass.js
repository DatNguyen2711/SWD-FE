import { useEffect } from "react";
import axios from "../libs/axios";
import { useState } from "react";
const useQueryClass = ({ orderBy, pageIndex, pageSize, sortBy }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalrecords, setTotalRecords] = useState(0);
  const [pagesizeresponse, setPagesizeResponse] = useState(0);
  const [pageindexresponse, setPageindexResponse] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/v1/class/search", {
          orderBy,
          pageIndex,
          pageSize,
          sortBy,
        });
        setPageindexResponse(response.data.data.pageIndex);
        setPagesizeResponse(response.data.data.pageSize);
        setTotalRecords(response.data.data.totalRecords);
        setClasses(response.data.data.classList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [pageIndex, orderBy, sortBy, pageSize]);

  return {
    classes,
    loading,
    error,
    totalrecords,
    pagesizeresponse,
    pageindexresponse,
  };
};

export default useQueryClass;
