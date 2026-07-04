import axios from "axios";

const API = "http://localhost:5000/api/auth";

const getToken = () => localStorage.getItem("token");

export const removePhoto = async () => {
  const response = await axios.delete(
    `${API}/remove-photo`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};