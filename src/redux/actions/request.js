/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:33:27
 * @LastEditTime : 2021-02-23 22:38:42
 * @FilePath     : /src/redux/actions/request.js
 */
export const get = (url, payload, config) => ({
  type: 'GET',
  request(axios, headers) {
    return axios.get(url, { 
      params: payload,
      headers: { 
        ...headers,
        ...config
      }});
  },
})

export const post = (url, payload, config) => ({
  type: 'POST',
  request(axios, headers) {
    return axios.post(url, payload, { 
      headers: {
        ...headers,
        ...config
      }
    });
  },
})