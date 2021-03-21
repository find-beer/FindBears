/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 10:57:04
 * @LastEditTime : 2021-02-28 12:43:37
 * @FilePath     : /src/utils/request.js
 */
import axios from 'axios';
import {apiProd} from '../config';
import KV from "./KV";
import AsyncStorage from "@react-native-community/async-storage";
import EventBus from "./EventBus";

const instance = axios.create({
    baseURL: apiProd.host,
    headers: {
        "Accept": "application/json",
        "Content-Type": 'application/json',
    },
});

instance.defaults.timeout = 30000;

//请求拦截器
instance.interceptors.request.use(
    async function (config) {
        // 添加响应头等等设置
        let result = await AsyncStorage.getItem('session');
        config.headers.token = result;
        config.headers.session = KV.getSessionId();
        return config;
    },
    function (error) {
        return Promise.reject(error); // 请求出错
    },
);

//返回拦截器
instance.interceptors.response.use(
    function (response) {
        if(response.data.code === 2000){
            EventBus.post('SESSION_EXPIRED',{})
            return true
        }
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);


export function GetRequest(url, params) {
    return instance.get(url, {
        params: params,
        // data: payload,
    });
}

export function PostRequest(url, par) {
    return instance.post(url, par);
}

export function PutRequest(url, par) {
    return instance.put(url, par);
}
