import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Employees
export const createEmployee = async (employee) => {
  return axios.post(`${API_URL}/karyawans`, employee);
};

export const getEmployees = async () => {
  return axios.get(`${API_URL}/karyawans`);
};

export const updateEmployee = async (id, employee) => {
  return axios.put(`${API_URL}/karyawans/${id}`, employee);
};

export const deleteEmployee = async (id) => {
  return axios.delete(`${API_URL}/karyawans/${id}`);
};

// Departments
export const createDepartment = async (department) => {
  return axios.post(`${API_URL}/departments`, department);
};

export const getDepartments = async () => {
  return axios.get(`${API_URL}/departments`);
};

// Positions
export const createPosition = async (job) => {
  return axios.post(`${API_URL}/jabatans`, job);
};

export const getPositions = async () => {
  return axios.get(`${API_URL}/jabatans`);
};
