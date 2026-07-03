import axios from "axios";

const API = "http://localhost:5000/api/employees";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getEmployees = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(API, employee, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${API}/${id}`, employee, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return response.data;
};