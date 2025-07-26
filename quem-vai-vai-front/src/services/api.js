import axios from 'axios';

console.log('API URL:', process.env.REACT_APP_API_URL);
const Api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
})

export default Api