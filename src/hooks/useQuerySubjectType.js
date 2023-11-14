import { useState, useEffect } from "react";
import authApi from "../libs/axios";

function useQuerySubjecctType({ orderBy, pageIndex, pageSize, sortBy }){
    const [subjectTypes, setSubjecttypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalrecords, setTotalRecords] = useState(0);
    const [pagesizeresponse, setPagesizeResponse] = useState(0);
    const [pageindexresponse, setPageindexResponse] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await authApi.post("/api/v1/subject/search", {
              orderBy,
              pageIndex,
              pageSize,
              sortBy,
            });
            setPageindexResponse(response.data.data.pageIndex);
            setPagesizeResponse(response.data.data.pageSize);
            setTotalRecords(response.data.data.totalRecords);
            setSubjecttypes(response.data.data.subjectList);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
        fetchData();
      }, [pageIndex, orderBy, sortBy]);

      return {
        subjectTypes,
        loading,
        error,
        totalrecords,
        pagesizeresponse,
        pageindexresponse,
      };
}
export default useQuerySubjecctType