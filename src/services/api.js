import axios from "axios";
import uri from "./server";

const api = axios.create({
    baseURL: uri+'/psiu-gestor/public/api/'
})

export default api