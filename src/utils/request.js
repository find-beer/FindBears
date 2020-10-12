import axios from 'axios';
import {apiProd} from '../config';
import KV from "./KV";

const instance = axios.create({
    baseURL: apiProd.host,
});

instance.defaults.timeout = 30000;

//请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 添加响应头等等设置
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
        // if (response.data.data.result === 404) {
        //  let { retMsg } = response.data.data
        //  // 服务端出现了一些问题的情况下
        //  Alert.alert('温馨提示', retMsg)
        //  // 等等按钮事件
        //  return Promise.reject(retMsg)
        // } else {
        //  // 服务端一切正常 返回data数据
        // }
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

export function DelRequest(url, payload) {
    return instance.delete(url, {
        data: payload,
    });
}

export function PutRequest(url, par, payload) {
    return instance.put(url, par, {
        data: payload,
    });
}
