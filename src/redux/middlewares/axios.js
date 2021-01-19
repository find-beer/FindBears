/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:38:18
 * @LastEditTime : 2021-01-17 21:51:33
 * @FilePath     : /src/redux/middleware/index.js
 */
import Axios from 'axios';

export default function(options) {
  const axios = Axios.create(options);
  return () => {
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

      return request(axios).then(successCallback).catch(failCallback);
    };
  };
}
