import axios from "axios";
const instance = axios.create({
  baseURL: "https://selam-backend-evangadi.onrender.com/api",
});
export default instance;
