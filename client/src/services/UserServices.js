import axios from "./custominze_axios";

const fetchAllUsers = async (
  page,
  keyword = "",
  fieldSearch = "email",
  sortMode = "no",
  orderCol = ""
) => {
  return axios.get(
    `/api/users?page=${page}&keyword=${keyword}&fieldSearch=${fieldSearch}&sortMode=${sortMode}&orderCol=${orderCol}`
  );
};
const creatUser = (email, firstName, lastName) => {
  const user = {
    first_name: firstName,
    last_name: lastName,
    email: email,
  };
  return axios.post(`/api/users/creat`, user);
};
const editUser = (id, email, firstName, lastName) => {
  const user = {
    id: id,
    first_name: firstName,
    last_name: lastName,
    email: email,
  };
  return axios.put(`/api/users/update`, user);
};
const deleteUser = (id) => {
  // console.log({ id: id });
  return axios.delete(`/api/users/delete`, { data: { id: id } });
};
const userLogin = (email, password) => {
  return axios.post("/api/login", { email: email, password: password });
};
const authorization = (token) => {
  return axios.post("/api/auth", "", { headers: { authtoken: token } });
};
export {
  fetchAllUsers,
  creatUser,
  editUser,
  deleteUser,
  userLogin,
  authorization,
};
