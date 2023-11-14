import { useState, useEffect } from "react";
import axios from "../libs/axios";

function useQuerySystemSetting({
    orderBy,
    pageIndex,
    pageSize,
    sortBy,
}) {
    const [systemSettings, setSystemSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalrecords, setTotalRecords] = useState(0);
    const [pagesizeresponse, setPagesizeResponse] = useState(0);
    const [pageindexresponse, setPageindexResponse] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/v1/system-setting/search", {
                    orderBy,
                    pageIndex,
                    pageSize,
                    sortBy,
                });
                setPageindexResponse(response.data.data.pageIndex);
                setPagesizeResponse(response.data.data.pageSize);
                setTotalRecords(response.data.data.totalRecords);
                systemSettings(response.data.data.issueList);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [pageIndex, orderBy, sortBy]);

    return {
        systemSettings,
        loading,
        error,
        totalrecords,
        pagesizeresponse,
        pageindexresponse,
    };
}

export default useQuerySystemSetting;