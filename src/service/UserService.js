import axios from "./Axios";

const fetchAllUser = (page) => {
  //   return axios.get("https://reqres.in/api/users?delay=1");
  return axios.get(`/api/users?page=${page}`);
};

const postCreateNewUser = (name, job) => {
  return axios.post("/api/users", { name, job });
};

const putUpdateUser = (name, job, id) => {
  return axios.put(`/api/users/${id}`, { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};

const loginAPI = (email, password) => {
  return axios.post("/api/login", { email, password });
};

export { fetchAllUser, postCreateNewUser, putUpdateUser, deleteUser, loginAPI };
