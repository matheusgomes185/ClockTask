import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:3333'
    baseURL: 'https://5bjgxtfm7h.execute-api.us-east-1.amazonaws.com/API-DevOps1',
});

export { api };