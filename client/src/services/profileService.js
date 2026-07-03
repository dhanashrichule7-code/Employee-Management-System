import axios from "axios";

const API = "http://localhost:5000/api/auth";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getProfile = async () => {
  const response = await axios.get(`${API}/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};