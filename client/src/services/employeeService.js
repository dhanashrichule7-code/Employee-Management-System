import axios from "axios";

const API = "http://localhost:5000/api/employees";

export const getEmployees = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(`${API}/create`, employee);
  return response.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${API}/update/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API}/delete/${id}`);
  return response.data;
};