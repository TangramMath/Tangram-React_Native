import axios from 'axios';

const request = axios.create({
    baseURL: 'https://api-tangram-mongo.herokuapp.com/'
})

export default request;