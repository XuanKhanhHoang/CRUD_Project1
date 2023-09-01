import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8081",
  // "https://reqres.in",
  timeout: 5000,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers = { ...config.headers, authtoken: token };
    // console.log(config.headers);
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    // console.log(error);
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    // console.log("axios res : ", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.config.method === "delete") return response;
    else return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error);
    // console.log(error);
    return { ...error, data: error.data | undefined };
  }
);
export default instance;
