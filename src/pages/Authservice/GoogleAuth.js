import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "../../libs/axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth";

const GoogleAuth = () => {
  const client_ID =
    "176972064565-4mi90c3t8tkfv8ple9nu79u98um456q5.apps.googleusercontent.com";
  const setLogin = useAuthStore((state) => state.setLogin);
  const nav = useNavigate();
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const decodedToken = jwt_decode(credentialResponse.credential);
      const response = await axios.post(
        "http://localhost:8088/api/v1/auth/login/google",
        {
          username: null,
          password: null,
          email: decodedToken.email,
          picture: decodedToken.picture,
          name: decodedToken.name,
          email_verified: decodedToken.email_verified,
          roleId: 1,
        }
      );

      const initialState = {
        token: response.data.data.token,
        isAuth: true,
        user: {
          active: true,
          id: response.data.data.user.id,
          email: response.data.data.user.email,
          picture: response.data.data.user.picture,
          name: response.data.data.user.name,
          emailVerified: response.data.data.user.emailVerified,
          roleId: response.data.data.user.roleId,
        },
        role: response.data.data.role,
      };
      setLogin(initialState);
      if (initialState.role === "ADMIN") {
        nav("/dashboard");
      } else if (initialState.role === "STUDENT") {
        nav("/issue");
      } else if (initialState.role === "MANAGER") {
        nav("/project");
      } else if (initialState.role === "TEACHER") {
        nav("/class");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={client_ID}>
        <GoogleLogin
          style={{ backgroundColor: "blue", color: "white" }}
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleAuth;
