/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:36:18
 * @LastEditTime : 2021-02-27 15:30:04
 * @FilePath     : /src/redux/store/index.js
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import AxiosCreator from '../middlewares/axios';

const middlewares = [
  AxiosCreator({
    baseURL: 'http://121.89.223.103:8080/',
    timeout: 5 * 1000,
  }),
];


export default initState => {
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
  const store = createStore(reducers, initState, composeEnhancers(applyMiddleware(...middlewares)))
  return {
    store,
  };
};

