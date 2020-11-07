import axios from 'axios';
import {apiProd} from '../config';
import KV from "./KV";

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
    function (config) {
        // 添加响应头等等设置
        config.headers.session = KV.getSessionId();
        config.headers.token = '1_1604737548947';

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
    console.log('接口地址', url);
    console.log('请求参数', par);
    return instance.post(url, par);
}

export function _internalRequest(requestUri, params, type) {

    let options = {
        method: type,
        headers: {
            "Content-Type": 'application/json',
            'token': '1_1604737548947',
        },
    };

    let finalUri = requestUri;
    if (type === 'GET') {
        if (params !== {}) {
            if (requestUri.indexOf('?') === -1) {
                finalUri += '?';
            } else {
                finalUri += '&';
            }
            finalUri += toQueryString(params);
        } else {
            finalUri = requestUri;
        }

    } else if (type === 'POST' || type === 'PUT' || type === 'DELETE') {
        options.body = JSON.stringify(params);
    }

    const uri = apiProd.host + finalUri;
    console.log('请求参数', options);
    console.log('请求地址', uri);
    fetch(uri, options)
        .then((response) => {
                return response.text();
            },
        )
        .then((responseText) => {
            console.log('请求结果', responseText);
            return responseText;
        })
        .catch((error) => {
            console.log('error==>', error);
            return error;
        })
        .done();

}

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        let val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
