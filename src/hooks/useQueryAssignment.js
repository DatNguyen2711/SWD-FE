
import { useState, useEffect } from "react";
import axios from "../libs/axios";

function useQueryAssignmnet({ orderBy, pageIndex, pageSize, sortBy }){
    const [assignment, setAssignment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalrecords, setTotalRecords] = useState(0);
    const [pagesizeresponse, setPagesizeResponse] = useState(0);
    const [pageindexresponse, setPageindexResponse] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post("/api/v1/assignment/search", {
              orderBy,
              pageIndex,
              pageSize,
              sortBy,
            });
            setPageindexResponse(response.data.data.pageIndex);
            setPagesizeResponse(response.data.data.pageSize);
            setTotalRecords(response.data.data.totalRecords);
            setAssignment(response.data.data.assignmentList);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
        fetchData();
      }, [pageIndex, orderBy, sortBy]);

      return {
        assignment,
        loading,
        error,
        totalrecords,
        pagesizeresponse,
        pageindexresponse,
      };
}
export default useQueryAssignmnet