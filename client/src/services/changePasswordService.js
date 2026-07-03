import axios from "axios";

const API = "http://localhost:5000/api/auth";

const getToken = () => {
  return localStorage.getItem("token");
};

export const changePassword = async (passwordData) => {
  const response = await axios.put(
    `${API}/change-password`,
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};