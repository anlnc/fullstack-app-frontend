import axios from "axios";
import Cookies from "js-cookie";

const api_url = process.env.SERVER_URL;
console.log("process.env", process.env);
console.log("api_url", api_url);

export const client = axios.create({
  baseURL: api_url,
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
