import { useState, useEffect } from "react";
import axios from "../libs/axios";

function useQueryProject(){
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalrecords, setTotalRecords] = useState(0);
    const [pagesizeresponse, setPagesizeResponse] = useState(0);
    const [pageindexresponse, setPageindexResponse] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post("/api/v1/projects/search", {});
            setPageindexResponse(response.data.data.pageIndex);
            setPagesizeResponse(response.data.data.pageSize);
            setTotalRecords(response.data.data.totalRecords);
            setProject(response.data.data.projectList);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
        fetchData();
      }, []);

      return {
        project,
        loading,
        error,
        totalrecords,
        pagesizeresponse,
        pageindexresponse,
      };
}
export default useQueryProject