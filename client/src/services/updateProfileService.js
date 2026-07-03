import axios from "axios";

const API = "http://localhost:5000/api/auth";

const getToken = () => {
  return localStorage.getItem("token");
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(
    `${API}/update-profile`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};