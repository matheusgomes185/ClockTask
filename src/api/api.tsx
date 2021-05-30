import axios from 'axios';

const api = axios.create({
    baseURL: 'http://54.90.83.189:3333',
    // baseURL: 'https://5bjgxtfm7h.execute-api.us-east-1.amazonaws.com/API-DevOps1',
});

export { api };