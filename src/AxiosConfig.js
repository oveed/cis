import axios from "axios";

const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosRequest;
