/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:38:18
 * @LastEditTime : 2021-02-21 22:01:14
 * @FilePath     : /src/redux/middlewares/axios.js
 */
import Axios from 'axios';

export default function(options) {
  const axios = Axios.create(options);
  axios.interceptors.request.use((config) => {
    console.log('request config', config)
    return config
  })
  axios.interceptors.response.use((data) => {
    console.log('reponse data', data)
    return data
  })

  return ({ getState }) => {
    const { userInfo } = getState()
    const requestHeaderConfig = {}
    const { token } = userInfo
    if (token) {
      requestHeaderConfig.token = token
    }
    return next => action => {
      const { type, request } = action;

      if (!request) {
        return next(action);
      }

      const successCallback = response => {
        next({ type, response, action });
        return response.data;
      };

      const failCallback = error => {
        next({ type, error, action });
        return Promise.reject(error);
      };

      return request(axios, requestHeaderConfig).then(successCallback).catch(failCallback);
    };
  };
}
