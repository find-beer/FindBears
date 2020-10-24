import axios from 'axios';
import {apiProd} from '../config';
import KV from "./KV";

const instance = axios.create({
    baseURL: apiProd.host,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

instance.defaults.timeout = 30000;

//请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 添加响应头等等设置
        config.headers.session = KV.getSessionId();
        config.headers.token = '2_1602603032869';

        return config;
    },
    function (error) {
        return Promise.reject(error); // 请求出错
    },
);

//返回拦截器
instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);


export function GetRequest(url, params, payload) {
    return instance.get(url, {
        params: params,
        data: payload,
    });
}

export function PostRequest(url, par) {
    return instance.post(url, par);
}
