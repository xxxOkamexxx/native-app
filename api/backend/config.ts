import { baseURL } from "../host";
import axios from "axios";

const api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


export default api;