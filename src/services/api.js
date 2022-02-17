import axios from "axios";
import uri from "./server";

const api = axios.create({
    baseURL: uri+'/api/'
})

export default api