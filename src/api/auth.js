import authApi from "../libs/axios";

const login = async (userData) => {
  try {
    const response = await authApi.post(
      "/api/v1/auth/login/email-password",
      userData
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

const register = async (userData) => {
  try {
    const response = await authApi.post("/api/v1/users/register", userData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export { login, register };
