import axios from "axios";
import Cookies from "js-cookie";

export const client = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "content-type": "application/json",
  },
});

client.interceptors.request.use(config => {
  const token = Cookies.get("token");
  if (token) {
    // Set the token as a Bearer token in the headers
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
