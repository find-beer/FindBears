/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:33:27
 * @LastEditTime : 2021-01-17 22:25:06
 * @FilePath     : /src/redux/actions/request.js
 */
export function get(url, payload, config) {
  return {
    type: 'GET',
    request(axios) {
      return axios.get(url, { params: payload, ...config });
    },
  };
}

export function post(url, payload, config) {
  return {
    type: 'POST',
    request(axios) {
      return axios.post(url, payload, config);
    },
  };
}