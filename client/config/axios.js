import axios from 'axios';

const clienteAxios  = axios.create({
        baseURL: 'http://localhost:4000/',
        timeout: 20000,
        headers: {
        'Content-Type': 'application/json',
        'WWW-Authenticate':'Basic'
        }
    });

export default clienteAxios;