import axios from "axios";

const api = axios.create({

  baseURL:
    "https://www.atscheckerpro.online/api/v1",

});

export default api;