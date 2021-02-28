/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:38:18
 * @LastEditTime : 2021-02-28 13:32:25
 * @FilePath     : /src/redux/middlewares/axios.js
 */
import Axios from 'axios';

export default function(options) {
  const axios = Axios.create(options);
  axios.interceptors.request.use((config) => {
    return config
  })
  axios.interceptors.response.use((data) => {
    return data
  })

  return ({ getState }) => {
    
    return next => action => {
      const { type, request } = action;
      if (!request) { return next(action)}

      const { userInfo } = getState()
      const { token } = userInfo
      const requestHeaderConfig = {}
      if (token) {
        requestHeaderConfig.token = token
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
