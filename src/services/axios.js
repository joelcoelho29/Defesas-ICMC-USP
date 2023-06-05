import axios from "axios";

const api = axios.create({
  baseURL: "http://thanos.icmc.usp.br:4567/api/v1",
});

export default api;
