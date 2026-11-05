
import axios from "axios";

const API = axios.create({
  baseURL: "https://findora-portal.onrender.com/api"
});

export default API;
