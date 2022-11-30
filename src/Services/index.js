import axios from 'axios';

const request = axios.create({
    baseURL: 'http://apitangram-env.eba-viv2qiyr.sa-east-1.elasticbeanstalk.com/'
})

export default request;