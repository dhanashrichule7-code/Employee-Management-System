import axios from "axios";

const API = "http://localhost:5000/api/employees";

const getToken = () => localStorage.getItem("token");

export const getEmployeeAnalytics = async () => {
  const res = await axios.get(`${API}/analytics`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};