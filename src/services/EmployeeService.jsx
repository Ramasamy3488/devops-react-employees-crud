import axios from "axios";

// const API_URL = "http://localhost:8080/api/employees";

const API_URL = `${process.env.REACT_APP_API_URL}/api/employees`;

export const getEmployees = () => axios.get(API_URL);
export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);
export const createEmployee = (emp) => axios.post(API_URL, emp);
export const updateEmployee = (id, emp) => axios.put(`${API_URL}/${id}`, emp);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);