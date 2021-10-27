import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.YASUMI_PUBLIC_API_URL,
});

export default axios;
