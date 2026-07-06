import axios from "axios";

const API = "http://localhost:5000/api/employees";

const getToken = () => localStorage.getItem("token");

export const getDashboardStats = async () => {
  const res = await axios.get(`${API}/dashboard-stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};