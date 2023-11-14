import { useQuery } from "@tanstack/react-query";
import authApi from "../libs/axios";

const getAllUsers = () => {
  return authApi.get("/api/v1/users/get-all").then((response) => {
    return response.data.data;
  });
};

function useQueryUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
}

export default useQueryUser;
