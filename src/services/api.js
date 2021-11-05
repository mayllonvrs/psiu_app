import axios from "axios"; 

const api = axios.create({
    baseURL: 'http://192.168.0.114/psiu-gestor/public/api/'
})

export default api